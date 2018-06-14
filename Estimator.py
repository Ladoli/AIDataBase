#  Copyright 2016 The TensorFlow Authors. All Rights Reserved.
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
"""An Example of a DNNClassifier for the Iris dataset."""
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import argparse
import tensorflow as tf

import Basic_Data


parser = argparse.ArgumentParser()
parser.add_argument('--batch_size', default=100, type=int, help='batch size')
parser.add_argument('--train_steps', default=1000, type=int,
                    help='number of training steps')

def main(argv):
    args = parser.parse_args(argv[1:])

    # Fetch the data
    (train_x, train_y), inputData = Basic_Data.load_data()

    # Feature columns describe how to use the input.
    my_feature_columns = []
    for key in train_x.keys():
        my_feature_columns.append(tf.feature_column.numeric_column(key=key))

    # Build 2 hidden layer DNN with 10, 10 units respectively.
    classifier = tf.estimator.DNNClassifier(
        feature_columns=my_feature_columns,
        # Two hidden layers of 10 nodes each.
        hidden_units=[1000, 1000],
        # The model must choose between 3 classes.
        n_classes=2)

    # Train the Model.
    classifier.train(
        input_fn=lambda:Basic_Data.train_input_fn(train_x, train_y,
                                                 args.batch_size),
        steps=args.train_steps)

    print("Finished Model")

    # Evaluate the model.
    # eval_result = classifier.evaluate(
    #     input_fn=lambda:iris_data.eval_input_fn(test_x, test_y,
    #                                             args.batch_size))
    #
    # print('\nTest set accuracy: {accuracy:0.3f}\n'.format(**eval_result))
    #
    # # Generate predictions from the model
    expected = [0,1]
    # predict_x = {
    #     'SepalLength': [5.1, 5.9, 6.9],
    #     'SepalWidth': [3.3, 3.0, 3.1],
    #     'PetalLength': [1.7, 4.2, 5.4],
    #     'PetalWidth': [0.5, 1.5, 2.1],
    # }
    #

    childrenNum = []
    incomeTotal = []
    creditAmt = []
    annuityAmt = []
    amtGoodsPrice = []

    for data in train_x.iterrows():
        childrenNum.append(data[1]['CNT_CHILDREN'])
        incomeTotal.append(data[1]['AMT_INCOME_TOTAL'])
        creditAmt.append(data[1]['AMT_CREDIT'])
        annuityAmt.append(data[1]['AMT_ANNUITY'])
        amtGoodsPrice.append(data[1]['AMT_GOODS_PRICE'])

    predict_x = {
    'CNT_CHILDREN':childrenNum,
    'AMT_INCOME_TOTAL':incomeTotal,
    'AMT_CREDIT':creditAmt,
    'AMT_ANNUITY':annuityAmt,
    'AMT_GOODS_PRICE':amtGoodsPrice
    }

    predictions = classifier.predict(
        input_fn=lambda:Basic_Data.eval_input_fn(predict_x,
                                                labels=None,
                                                batch_size=args.batch_size))
    #
    template = ('\nPrediction is "{}" ({:.1f}%)')
    #
    for pred_dict in predictions:
        class_id = pred_dict['class_ids'][0]
        probability = pred_dict['probabilities'][class_id]

        print(template.format(Basic_Data.SPECIES[class_id],
                              100 * probability))


if __name__ == '__main__':
    tf.logging.set_verbosity(tf.logging.INFO)
    tf.app.run(main)
