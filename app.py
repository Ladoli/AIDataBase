import tensorflow as tf
import pandas as pd
from inspect import getmembers
from pprint import pprint
import numpy as np
from flask import Flask
from flask import request
import json
from flask_cors import CORS
import Basic_Data




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



        #PREDICTION CODE BELOW

        # (train_x, train_y), inputData, (test_x, test_y) = Basic_Data.load_data()
        #
        # my_feature_columns = []
        # my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('NAME_CONTRACT_TYPE',2)))
        # my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('FLAG_OWN_CAR',2)))
        # my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('FLAG_OWN_REALTY',2)))
        #
        #
        # for x in range(2, 21):
        #     my_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_DOCUMENT_'+str(x)))
        #
        # my_feature_columns.append(tf.feature_column.numeric_column(key='EXT_SOURCE_2'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='CNT_CHILDREN'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='CNT_FAM_MEMBERS'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='REGION_RATING_CLIENT'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='REGION_RATING_CLIENT_W_CITY'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='OBS_30_CNT_SOCIAL_CIRCLE'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='DEF_30_CNT_SOCIAL_CIRCLE'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='OBS_60_CNT_SOCIAL_CIRCLE'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='DEF_60_CNT_SOCIAL_CIRCLE'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_MOBIL'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_EMP_PHONE'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_WORK_PHONE'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_CONT_MOBILE'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_PHONE'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_EMAIL'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='REG_REGION_NOT_LIVE_REGION'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='REG_REGION_NOT_WORK_REGION'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='LIVE_REGION_NOT_WORK_REGION'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='REG_CITY_NOT_LIVE_CITY'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='REG_CITY_NOT_WORK_CITY'))
        # my_feature_columns.append(tf.feature_column.numeric_column(key='LIVE_CITY_NOT_WORK_CITY'))
        #
        # classifier = tf.estimator.DNNClassifier(
        #     feature_columns=my_feature_columns,
        #     hidden_units=[100,100,100,100],
        #     n_classes=2, model_dir="DNNModelBalanced")

        # predictions = classifier.predict(
        #     input_fn=lambda:Basic_Data.eval_input_fn(test_x,
        #                                             labels=None,
        #                                             batch_size=500))
        #
        # template = ('\nPrediction is "{}" ({:.1f}%)')
        # #
        # for pred_dict in predictions:
        #     class_id = pred_dict['class_ids'][0]
        #     probability = pred_dict['probabilities'][class_id]
        #
        #     print(template.format(Basic_Data.SPECIES[class_id],
        #                           100 * probability))









        #CODE FOR RETURNING INFO
        return json.dumps({"prediction": loanAmount})
    app.run(debug=True, port=5000)


if __name__ == '__main__':
    tf.logging.set_verbosity(tf.logging.INFO)
    tf.app.run(main)
