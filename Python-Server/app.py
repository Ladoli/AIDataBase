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
import traceback




KIDS_COST = 14000
BATCH_SIZE = 10
TRAIN_FILE = 'Successes.csv'

def main(argv):



    income = tf.feature_column.numeric_column('AMT_INCOME_TOTAL')
    loan_amount = tf.feature_column.numeric_column('AMT_CREDIT')
    source_2 = tf.feature_column.numeric_column('EXT_SOURCE_2')
    own_real_estate = tf.feature_column.categorical_column_with_vocabulary_list(
    'FLAG_OWN_REALTY', [
      'N', 'Y'])
    loan_type = tf.feature_column.categorical_column_with_vocabulary_list(
         'NAME_CONTRACT_TYPE', [
           'Cash loans', 'Revolving loans'])



    base_columns = [
        income
    ]


    estimator = tf.estimator.LinearRegressor(
        feature_columns=base_columns,loss_reduction=tf.losses.Reduction.MEAN,
        model_dir="LinearModel")

    print("Model loaded")


    app = Flask(__name__)
    CORS(app)
    @app.route("/LoanRecommenderAI")
    def loanRecommender():
        try:
            unadjustedPassedInc = float(request.args["income"])
            passedKids = float(0)
            if request.args["kids"]:
                passedKids = float(request.args["kids"])
            passedInc = (unadjustedPassedInc-(passedKids*KIDS_COST))/1000
            estimator = tf.estimator.LinearRegressor(
                feature_columns=base_columns,loss_reduction=tf.losses.Reduction.MEAN,
                model_dir="LinearModel")

            modifiedIncome = []


            modifiedIncome.append(passedInc)



            input_dict = {
                "AMT_INCOME_TOTAL": modifiedIncome,
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
              loanAmount = prediction["predictions"][0]*1000
              loanAmount = str(loanAmount)
            print(loanAmount)
            return json.dumps({"prediction": loanAmount})
        except:
            return json.dumps({"error": "Server Error. Check Input"})


    @app.route("/ClassifierAI")
    def targetClassifier():

        try:

            classifier_feature_columns = []

            classifier_dict = {}

            classifier_feature_columns.append(tf.feature_column.numeric_column(key='CNT_CHILDREN'))
            kids = [0]
            try:
                kids = [int(request.args["kids"])]
            except:
                pass
            classifier_dict['CNT_CHILDREN'] = kids


            classifier_feature_columns.append(tf.feature_column.numeric_column(key='CNT_FAM_MEMBERS'))
            fam = [1]
            try:
                famCount = [int(request.args["fam"])]
            except:
                pass
            classifier_dict['CNT_FAM_MEMBERS'] = fam

            classifier_feature_columns.append(tf.feature_column.numeric_column(key='REGION_RATING_CLIENT'))
            regRatCli = [1]
            try:
                regRatCli = [int(request.args["regRatCli"])]
            except:
                pass
            classifier_dict['REGION_RATING_CLIENT'] = regRatCli

            classifier_feature_columns.append(tf.feature_column.numeric_column(key='REGION_RATING_CLIENT_W_CITY'))
            regRatCliCity = [1]
            try:
                regRatCliCity = [int(request.args["regRatCliCity"])]
            except:
                pass
            classifier_dict['REGION_RATING_CLIENT_W_CITY'] = regRatCliCity



            classifier_feature_columns.append(tf.feature_column.numeric_column(key='EXT_SOURCE_2'))
            src2 = [1]
            try:
                regRatCliCity = [float(request.args["src2"])]
            except:
                pass
            classifier_dict['EXT_SOURCE_2'] = src2



            classifier_feature_columns.append(tf.feature_column.numeric_column(key='OBS_30_CNT_SOCIAL_CIRCLE'))
            obs30soc = [0]
            try:
                obs30soc = [int(request.args["obs30soc"])]
            except:
                pass
            classifier_dict['OBS_30_CNT_SOCIAL_CIRCLE'] = obs30soc



            classifier_feature_columns.append(tf.feature_column.numeric_column(key='DEF_30_CNT_SOCIAL_CIRCLE'))
            def30soc = [0]
            try:
                def30soc = [int(request.args["def30soc"])]
            except:
                pass
            classifier_dict['DEF_30_CNT_SOCIAL_CIRCLE'] = def30soc

            classifier_feature_columns.append(tf.feature_column.numeric_column(key='OBS_60_CNT_SOCIAL_CIRCLE'))
            obs60soc = [0]
            try:
                obs60soc = [int(request.args["obs60soc"])]
            except:
                pass
            classifier_dict['OBS_60_CNT_SOCIAL_CIRCLE'] = obs60soc

            classifier_feature_columns.append(tf.feature_column.numeric_column(key='DEF_60_CNT_SOCIAL_CIRCLE'))
            def60soc = [0]
            try:
                def60soc = [int(request.args["def60soc"])]
            except:
                pass
            classifier_dict['DEF_60_CNT_SOCIAL_CIRCLE'] = def60soc


            classifier_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('NAME_CONTRACT_TYPE',2)))
            loanType = ["Cash loans"]
            try:
                loanType = [request.args["loanType"]]
            except:
                pass
            classifier_dict['NAME_CONTRACT_TYPE'] = loanType


            classifier_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('FLAG_OWN_REALTY',2)))
            ownRealty = ["N"]
            try:
                ownRealty = [request.args["ownRealty"]]
            except:
                pass
            classifier_dict['FLAG_OWN_REALTY'] = ownRealty

            classifier_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('FLAG_OWN_CAR',2)))
            ownCar = ["N"]
            try:
                ownCar = [request.args["ownCar"]]
            except:
                pass
            classifier_dict['FLAG_OWN_CAR'] = ownCar

            docs = []
            for x in range(0, 21):
                docs.append([0])
            for x in range(2, 21):
                classifier_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_DOCUMENT_'+str(x)))
                try:
                    docs[x] = [int(request.args["doc"+str(x)])]
                except:
                    pass
                classifier_dict['FLAG_DOCUMENT_'+str(x)] = docs[x]

            classifier_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_MOBIL'))
            flagMob = [0]
            try:
                flagMob = [int(request.args["flagMob"])]
            except:
                pass
            classifier_dict['FLAG_MOBIL'] = flagMob

            classifier_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_EMP_PHONE'))
            flagEmpMob = [0]
            try:
                flagEmpMob = [int(request.args["flagEmpMob"])]
            except:
                pass
            classifier_dict['FLAG_EMP_PHONE'] = flagEmpMob

            classifier_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_WORK_PHONE'))
            flagWorkMob = [0]
            try:
                flagWorkMob = [int(request.args["flagWorkMob"])]
            except:
                pass
            classifier_dict['FLAG_WORK_PHONE'] = flagWorkMob


            classifier_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_CONT_MOBILE'))
            flagContMob = [0]
            try:
                flagContMob = [int(request.args["flagContMob"])]
            except:
                pass
            classifier_dict['FLAG_CONT_MOBILE'] = flagContMob

            classifier_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_PHONE'))
            flagPhone = [0]
            try:
                flagPhone = [int(request.args["flagPhone"])]
            except:
                pass
            classifier_dict['FLAG_PHONE'] = flagPhone

            classifier_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_EMAIL'))
            flagEmail = [0]
            try:
                flagEmail = [int(request.args["flagEmail"])]
            except:
                pass
            classifier_dict['FLAG_EMAIL'] = flagEmail


            classifier_feature_columns.append(tf.feature_column.numeric_column(key='REG_REGION_NOT_LIVE_REGION'))
            flagRegNoLive = [1]
            try:
                flagRegNoLive = [int(request.args["flagRegNoLive"])]
            except:
                pass
            classifier_dict['REG_REGION_NOT_LIVE_REGION'] = flagRegNoLive


            classifier_feature_columns.append(tf.feature_column.numeric_column(key='REG_REGION_NOT_WORK_REGION'))
            flagRegNoWork = [1]
            try:
                flagRegNoWork = [int(request.args["flagRegNoWork"])]
            except:
                pass
            classifier_dict['REG_REGION_NOT_WORK_REGION'] = flagRegNoWork


            classifier_feature_columns.append(tf.feature_column.numeric_column(key='LIVE_REGION_NOT_WORK_REGION'))
            flagLiveNoWork = [1]
            try:
                flagLiveNoWork = [int(request.args["flagLiveNoWork"])]
            except:
                pass
            classifier_dict['LIVE_REGION_NOT_WORK_REGION'] = flagLiveNoWork


            classifier_feature_columns.append(tf.feature_column.numeric_column(key='REG_CITY_NOT_LIVE_CITY'))
            flagRegNoLiveCity = [1]
            try:
                flagRegNoLiveCity = [int(request.args["flagRegNoLiveCity"])]
            except:
                pass
            classifier_dict['REG_CITY_NOT_LIVE_CITY'] = flagRegNoLiveCity


            classifier_feature_columns.append(tf.feature_column.numeric_column(key='REG_CITY_NOT_WORK_CITY'))
            flagCityNoWork = [1]
            try:
                flagCityNoWork = [int(request.args["flagCityNoWork"])]
            except:
                pass
            classifier_dict['REG_CITY_NOT_WORK_CITY'] = flagCityNoWork


            classifier_feature_columns.append(tf.feature_column.numeric_column(key='LIVE_CITY_NOT_WORK_CITY'))
            flagLiveNoWorkCity = [1]
            try:
                flagLiveNoWorkCity = [int(request.args["flagLiveNoWorkCity"])]
            except:
                pass
            classifier_dict['LIVE_CITY_NOT_WORK_CITY'] = flagLiveNoWorkCity

            # print(classifier_dict) #For seeing inputs


            classifier = tf.estimator.DNNClassifier(
                feature_columns=classifier_feature_columns,
                hidden_units=[100,100,100,100],
                n_classes=2, model_dir="DNNModelBalanced")

            predictions = classifier.predict(
                input_fn=lambda:Basic_Data.eval_input_fn(classifier_dict,
                                                        labels=None,
                                                        batch_size=1))

            predictionResults = json.dumps({})

            template = ('\nPrediction is "{}" ({:.1f}%)')
            for pred_dict in predictions:
                class_id = pred_dict['class_ids'][0]
                prob = pred_dict['probabilities'][class_id]


                print(template.format(Basic_Data.TARGET_RESULT[class_id],
                                      100 * prob))

                probstr = str(100 * prob)

                predictionResults =  json.dumps({"loanClassification": Basic_Data.TARGET_RESULT[class_id],
                "probability":probstr})

            return predictionResults

        except Exception as err:
            traceback.print_exc()
            return json.dumps({"error": "Server Error. Check Input"})







        #CODE FOR RETURNING INFO
    app.run(debug=True, port=5000)


if __name__ == '__main__':
    tf.logging.set_verbosity(tf.logging.INFO)
    tf.app.run(main)
