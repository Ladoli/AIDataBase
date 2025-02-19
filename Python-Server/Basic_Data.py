import pandas as pd
import tensorflow as tf

TRAIN_FILE = "50kSortedClassifier.csv"
INPUT_FILE = "BalancedTest.csv"

# TEST_COLUMN_NAMES = ['TARGET','CNT_CHILDREN','AMT_INCOME_TOTAL','AMT_CREDIT','AMT_ANNUITY','AMT_GOODS_PRICE']
# INPUT_COLUMN_NAMES = ['CNT_CHILDREN','AMT_INCOME_TOTAL','AMT_CREDIT','AMT_ANNUITY','AMT_GOODS_PRICE']
#

TARGET_RESULT = [0, 1]

SKIPROWS = []

ROWS = 50000

for x in range(1, ROWS):
    SKIPROWS.append(x)

def load_data():


    train = pd.read_csv(TRAIN_FILE, header=0)
    train.fillna(0, inplace=True)
    train_x, train_y = train, train.pop('TARGET')
# skiprows=SKIPROWS,
    test = pd.read_csv(INPUT_FILE,header=0)
    test.fillna(0, inplace=True)
    test_x, test_y = test, test.pop('TARGET')

    inputData = pd.read_csv(INPUT_FILE,nrows=30, header=0)
    inputData.fillna(0, inplace=True)

    return (train_x, train_y),inputData,(test_x, test_y)
    # , (test_x, test_y)


def train_input_fn(features, labels, batch_size):
    """An input function for training"""
    # Convert the inputs to a Dataset.
    dataset = tf.data.Dataset.from_tensor_slices((dict(features), labels))

    # Shuffle, repeat, and batch the examples.
    dataset = dataset.shuffle(1000).repeat().batch(batch_size)

    # Return the dataset.
    return dataset


def eval_input_fn(features, labels, batch_size):
    """An input function for evaluation or prediction"""
    features=dict(features)
    if labels is None:
        # No labels, use only features.
        inputs = features
    else:
        inputs = (features, labels)

    # Convert the inputs to a Dataset.
    dataset = tf.data.Dataset.from_tensor_slices(inputs)

    # Batch the examples
    assert batch_size is not None, "batch_size must not be None"
    dataset = dataset.batch(batch_size)

    # Return the dataset.
    return dataset

    # tensorflowjs_converter \
    # --input_format=tf_saved_model \
    # --output_node_names='dnn/hiddenlayer_0/kernel/part_0' \
    # --saved_model_tags=serve \
    # MODEL/1530575865 \
    # WEB
