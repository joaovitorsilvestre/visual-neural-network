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

    this.wih = np.random([this.hnodes, this.inodes])
    this.who = np.random([this.onodes, this.hnodes])
  }

  query (inputList) {
    const inputs = np.array(inputList).reshape(inputList.lenght, 1)

    const hiddenInputs = np.dot(this.wih, inputs)
    const hiddenOutputs = np.sigmoid(hiddenInputs)

    const finalInputs = np.dot(this.who, hiddenOutputs)
    const finalOutputs = np.multiply(finalInputs)

    return finalOutputs
  }

  partial (inputList) {
    const outputsFirstLayer = np.sigmoid(inputList)
    console.log('outputsFirstLayer', outputsFirstLayer.tolist())
    console.log('wih', this.wih.tolist())
    const outputsFirstWeight = this.multiply(outputsFirstLayer, this.wih.tolist())
    console.log('outputsFirstWeight', outputsFirstWeight.tolist())

    const inputsHiddenLayer = np.dot(outputsFirstLayer, this.wih.T)
    const outputsHiddenLayer = np.sigmoid(inputsHiddenLayer)

    const outputsSecondWeight = this.multiply(outputsHiddenLayer, this.who.tolist())
    const inputsOutputLayer = np.dot(outputsHiddenLayer, this.who.T)

    const outputsOutputLayer = np.sigmoid(inputsOutputLayer)

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
      r[1] = row[2] * a[1]
      r[2] = row[2] * a[2]
      final.push(r)
    })
    return np.array(final)
  }

  sumAllCols (m) {
    let final = []
    m.tolist().forEach(row => {
      let all = 0
      row.forEach(col => {
        all += col
      })
      final.push(all)
    })
    return np.array(final)
  }
}

export default Neural
