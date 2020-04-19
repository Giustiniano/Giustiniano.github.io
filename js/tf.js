const model = tf.loadLayersModel('model/model.json').then(function(model){console.log("model loaded")})

  async function predict(imageData) {

    await tf.tidy(() => {

      // Convert the canvas pixels to a Tensor of the matching shape
      let img = tf.fromPixels(imageData, 1);
      img = img.reshape([1, 28, 28, 1]);
      img = tf.cast(img, 'float32');

      // Make and format the predications
      const output = model.predict(img)

      // Save predictions on the component
      this.predictions = Array.from(output.dataSync()); 
    });

  }