import tensorflow as tf
import pandas as pd
from inspect import getmembers
from pprint import pprint
import numpy as np
from flask import Flask
from flask import request
import json
from flask_cors import CORS




KIDS_COST = 14000
BATCH_SIZE = 10
TRAIN_FILE = 'Successes.csv'

def main(argv):



    # children_count = tf.feature_column.numeric_column('CNT_CHILDREN')
    income = tf.feature_column.numeric_column('AMT_INCOME_TOTAL')
    # annuity = tf.feature_column.numeric_column('AMT_ANNUITY')
    loan_amount = tf.feature_column.numeric_column('AMT_CREDIT')
    # goods_price = tf.feature_column.numeric_column('AMT_GOODS_PRICE')
    source_2 = tf.feature_column.numeric_column('EXT_SOURCE_2')
    own_real_estate = tf.feature_column.categorical_column_with_vocabulary_list(
    'FLAG_OWN_REALTY', [
      'N', 'Y'])
    loan_type = tf.feature_column.categorical_column_with_vocabulary_list(
         'NAME_CONTRACT_TYPE', [
           'Cash loans', 'Revolving loans'])



    base_columns = [
        income, source_2,own_real_estate,loan_type
    ]


    estimator = tf.estimator.LinearRegressor(
        feature_columns=base_columns,loss_reduction=tf.losses.Reduction.MEAN,
        model_dir="LinearModel")

    print("Model loaded")


    app = Flask(__name__)
    CORS(app)
    @app.route("/")
    def hello():
        # http://localhost:5000/hello?income=200000&src2=1&houseOwn=Y&loanType=Cash%20loans
        unadjustedPassedInc = float(request.args["income"])
        passedAnnuity = float(request.args["annuity"])
        passedKids = float(request.args["kids"])
        passedSrc = float(request.args["src2"])
        passedHouse = request.args["houseOwn"]
        passedLoan = request.args["loanType"]
        passedInc = unadjustedPassedInc-passedAnnuity-(passedKids*KIDS_COST)
        estimator = tf.estimator.LinearRegressor(
            feature_columns=base_columns,loss_reduction=tf.losses.Reduction.MEAN,
            model_dir="LinearModel")

        source2 = []
        modifiedIncome = []
        ownHouse= []
        contractType = []

        modifiedIncome.append(passedInc)
        source2.append(passedSrc)
        ownHouse.append(passedHouse)
        contractType.append(passedLoan)


        input_dict = {
            # "CNT_CHILDREN": np.array([0]),
            "EXT_SOURCE_2": source2,
            # "AMTRAIN_FILET_GOODS_PRICE": np.array([657]),
            "AMT_INCOME_TOTAL": modifiedIncome,
            # "AMT_ANNUITY": np.array([9])
            "FLAG_OWN_REALTY": ownHouse,
            "NAME_CONTRACT_TYPE": contractType
        }

        def eval_input_fn():
            features=dict(input_dict)
            inputs = features
            dataset = tf.data.Dataset.from_tensor_slices(inputs)
            dataset = dataset.batch(BATCH_SIZE)
            return dataset

        predict_results = estimator.predict(
            input_fn=lambda:eval_input_fn())

        # Print the prediction results.

        loanAmount = 0

        print("\nPrediction results:")
        for i, prediction in enumerate(predict_results):
          loanAmount = prediction["predictions"][0]
          print(str(loanAmount))
          loanAmount = str(loanAmount)
        # loanAmount = json.dumps(loanAmount)
        # print(type(loanAmount))
        # loanAmount = json.loads(loanAmount)
        # print(type(loanAmount))

        print(loanAmount)
        return json.dumps({"prediction": loanAmount})
    app.run(debug=True, port=5000)


if __name__ == '__main__':
    tf.logging.set_verbosity(tf.logging.INFO)
    tf.app.run(main)
