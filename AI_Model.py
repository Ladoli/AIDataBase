import tensorflow as tf
import pandas as pd


TRAIN_FILE = "cutApplication.csv"
# TEST_FILE = "application_test.csv"
# TEST_RESULTS_FILE = "sample_submission.csv"
batch_size = 100

train = pd.read_csv(TRAIN_FILE,header=0,nrows=500,low_memory=False)
train.fillna('', inplace=True)
train_y = train.pop('TARGET')
# print(train_y)
train_x = train
# print(train_x)

my_feature_columns = []
for key in train_x.keys():
        my_feature_columns.append(tf.feature_column.numeric_column(key=key))

# test = pd.read_csv(TEST_FILE,header=0,nrows=100,low_memory=False)
# test_x = test
#
# testResults = pd.read_csv(TEST_RESULTS_FILE,header=0,nrows=100,low_memory=False)
# test_y = testResults.pop('TARGET')


classifier = tf.estimator.DNNClassifier(
        feature_columns=my_feature_columns,
        hidden_units=[9],
        n_classes=2)





dataset = tf.data.Dataset.from_tensor_slices((dict(train_x), train_y))
dataset = dataset.shuffle(1000).repeat().batch(batch_size)



classifier.train(
        input_fn=lambda:dataset,
        steps=1000)



#
# features=dict(test_x)
# if test_y is None:
#     inputs = features
# else:
#     inputs = (features, test_y)
#
# testDataset = tf.data.Dataset.from_tensor_slices(inputs)
#
# # Batch the examples
# assert batch_size is not None, "batch_size must not be None"
# testDataset = testDataset.batch(batch_size)
#
#
# eval_result = classifier.evaluate(
#     input_fn=lambda:testDataset)

print('\nTest set accuracy: {accuracy:0.3f}\n'.format(**eval_result))
