from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import argparse
import tensorflow as tf
from flask import Flask
import Basic_Data


parser = argparse.ArgumentParser()
parser.add_argument('--batch_size', default=500, type=int, help='batch size')
parser.add_argument('--train_steps', default=8000, type=int,
                    help='number of training steps')

def main(argv):
    args = parser.parse_args(argv[1:])

    # Fetch the data
    (train_x, train_y), inputData, (test_x, test_y) = Basic_Data.load_data()

    # Feature columns describe how to use the input.
    my_feature_columns = []
    my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('NAME_CONTRACT_TYPE',2)))
    my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('FLAG_OWN_CAR',2)))
    my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('FLAG_OWN_REALTY',2)))


    for x in range(2, 21):
        my_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_DOCUMENT_'+str(x)))

        # my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('FLAG_DOCUMENT_'+str(x),2)))
    my_feature_columns.append(tf.feature_column.numeric_column(key='EXT_SOURCE_2'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='CNT_CHILDREN'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='CNT_FAM_MEMBERS'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='REGION_RATING_CLIENT'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='REGION_RATING_CLIENT_W_CITY'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='OBS_30_CNT_SOCIAL_CIRCLE'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='DEF_30_CNT_SOCIAL_CIRCLE'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='OBS_60_CNT_SOCIAL_CIRCLE'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='DEF_60_CNT_SOCIAL_CIRCLE'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_MOBIL'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_EMP_PHONE'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_WORK_PHONE'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_CONT_MOBILE'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_PHONE'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='FLAG_EMAIL'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='REG_REGION_NOT_LIVE_REGION'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='REG_REGION_NOT_WORK_REGION'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='LIVE_REGION_NOT_WORK_REGION'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='REG_CITY_NOT_LIVE_CITY'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='REG_CITY_NOT_WORK_CITY'))
    my_feature_columns.append(tf.feature_column.numeric_column(key='LIVE_CITY_NOT_WORK_CITY'))


        # my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('REG_REGION_NOT_LIVE_REGION',2)))
        # my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('REG_REGION_NOT_WORK_REGION',2)))
        # my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('LIVE_REGION_NOT_WORK_REGION',2)))
        # my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('REG_CITY_NOT_LIVE_CITY',2)))
        # my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('REG_CITY_NOT_WORK_CITY',2)))
        # my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('LIVE_CITY_NOT_WORK_CITY',2)))
        #

        # my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('FLAG_MOBIL',2)))
        # my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('FLAG_EMP_PHONE',2)))
        # my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('FLAG_WORK_PHONE',2)))
        # my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('FLAG_CONT_MOBILE',2)))
        # my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('FLAG_PHONE',2)))
        # my_feature_columns.append(tf.feature_column.indicator_column(tf.feature_column.categorical_column_with_hash_bucket('FLAG_EMAIL',2)))

    # Build 2 hidden layer DNN with 10, 10 units respectively.
    classifier = tf.estimator.DNNClassifier(
        feature_columns=my_feature_columns,
        # Two hidden layers of 10 nodes each.
        hidden_units=[100,100,100,100],
        # The model must choose between 3 classes.
        n_classes=2, model_dir="DNNModelBalanced")


    # classifier.train(
    #     input_fn=lambda:Basic_Data.train_input_fn(test_x, test_y,
    #                                              args.batch_size),
    #     steps=args.train_steps)

    # Evaluate the model.
    # eval_result = classifier.evaluate(
    #     input_fn=lambda:Basic_Data.eval_input_fn(train_x, train_y,
    #                                             args.batch_size))

    # eval_result = classifier.evaluate(
    #     input_fn=lambda:Basic_Data.eval_input_fn(test_x, test_y,
    #                                             args.batch_size))

    # print('\nTest set accuracy: {accuracy:0.3f}\n'.format(**eval_result))

    predictions = classifier.predict(
        input_fn=lambda:Basic_Data.eval_input_fn(test_x,
                                                labels=None,
                                                batch_size=args.batch_size))
    #
    # template = ('\nPrediction is "{}" ({:.1f}%)')
    # #
    # for pred_dict in predictions:
    #     class_id = pred_dict['class_ids'][0]
    #     probability = pred_dict['probabilities'][class_id]
    #
    #     print(template.format(Basic_Data.SPECIES[class_id],
    #                           100 * probability))




if __name__ == '__main__':
    tf.logging.set_verbosity(tf.logging.INFO)
    tf.app.run(main)
    app.run(debug=True, port=5000)
