import np from 'numjs'

// const inputNodes = 784
// const hiddenNodes = 784
// const outputNodes = 784
// const learningRate = 0.1

class Neural {
  constructor (inputNodes, hiddenNodes, outputNodes, learningRate) {
    this.inodes = inputNodes
    this.hnodes = hiddenNodes
    this.onodes = outputNodes
    this.lr = learningRate

    this.wih = np.array([[0.1, 0.2, 0.3], [0.4, 0.5, 0.6], [0.7, 0.8, 0.9]])
    this.who = np.array([[0.1, 0.2, 0.3], [0.4, 0.5, 0.6], [0.7, 0.8, 0.9]])
    // this.wih = np.random([this.hnodes, this.inodes])
    // this.who = np.random([this.onodes, this.hnodes])
  }

  partial (inputList) {
    const outputsFirstLayer = np.sigmoid(inputList)
    const outputsFirstWeight = this.multiply(outputsFirstLayer, this.wih.T).T

    const inputsHiddenLayer = np.dot(outputsFirstLayer, this.wih)
    const outputsHiddenLayer = np.sigmoid(inputsHiddenLayer)

    const outputsSecondWeight = this.multiply(outputsHiddenLayer, this.who.T)
    console.log('outputsSecondWeight', outputsSecondWeight.tolist())
    const inputsOutputLayer = np.dot(outputsHiddenLayer, this.who)
    console.log('inputsOutputLayer', inputsOutputLayer.tolist())

    const outputsOutputLayer = np.sigmoid(inputsOutputLayer)
    console.log('outputsOutputLayer', outputsOutputLayer.tolist())

    return {
      outputsFirstLayer: outputsFirstLayer.tolist(),
      outputsFirstWeight: outputsFirstWeight.tolist(),
      inputsHiddenLayer: inputsHiddenLayer.tolist(),
      outputsHiddenLayer: outputsHiddenLayer.tolist(),
      outputsSecondWeight: outputsSecondWeight.tolist(),
      inputsOutputLayer: inputsOutputLayer.tolist(),
      outputsOutputLayer: outputsOutputLayer.tolist()
    }
  }

  multiply (a, b) {
    a = a instanceof np.NdArray ? a.tolist() : a
    b = b instanceof np.NdArray ? b.tolist() : b

    let final = []
    b.forEach(row => {
      let r = []
      r[0] = row[0] * a[0]
      r[1] = row[1] * a[1]
      r[2] = row[2] * a[2]
      final.push(r)
    })
    return np.array(final)
  }
}

export default Neural
