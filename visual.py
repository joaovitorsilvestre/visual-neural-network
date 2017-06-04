import numpy as np
import scipy.special

inodes = 3
hnodes = 3
onodes = 3
inputs = np.array([2,1,0.2])
activation_function = lambda x: scipy.special.expit(x)

wih = np.array([[0.1, 0.2, 0.3], [0.4, 0.5, 0.6], [0.7, 0.8, 0.9]])
who = np.array([[0.1, 0.2, 0.3], [0.4, 0.5, 0.6], [0.7, 0.8, 0.9]])

outputs_first_layer = activation_function(inputs)
outputs_first_weight = np.multiply(outputs_first_layer, wih.T).T

inputs_hidden_layer = np.dot(outputs_first_layer, wih)
outputs_hidden_layer = activation_function(inputs_hidden_layer)

outputs_second_weight = np.multiply(outputs_hidden_layer, who.T)
inputs_output_layer = np.dot(outputs_hidden_layer, who)

######################################## ABAIXO
outputs_output_layer = activation_function(inputs_output_layer)

print('-----------')
print('outputs_first_layer')
print(outputs_first_layer)
print('-----------')
print('outputs_first_weight')
print(outputs_first_weight)
print('-----------')
print('inputs_hidden_layer')
print(inputs_hidden_layer)
print('-----------')
print('outputs_hidden_layer')
print(outputs_hidden_layer)
print('-----------')
print('outputs_second_weight')
print(outputs_second_weight)
print('-----------')
print('inputs_output_layer')
print(inputs_output_layer)
print('-----------')
print('outputs_output_layer')
print(outputs_output_layer)
print('-----------')