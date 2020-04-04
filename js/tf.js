import * as tf from '@tensorflow/tfjs';


const model = tf.loadLayersModel('model/model.json').then(function(model){alert("model loaded")})