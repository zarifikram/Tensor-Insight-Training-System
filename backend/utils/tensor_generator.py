from .tensor_initiator import TensorGenerator
from .tensor_manipulator import TensorManipulator
import torch

def tensor_generator(args):
    # accept args['chosen_methods'], args['depth'], args[']
    # outputs ret['manipulation_code'], ret['input_tensor'], ret['expected_tensor'], ret['operations_used']
    try:
        gen = TensorGenerator(operations=args['chosen_initiator'])
        shape = gen.get_random_shape()
        tensor, code = gen.generate_from_shape(shape)

        manipulator = TensorManipulator(args['chosen_manipulator'])
        manipulated_tensor, exec_code, eval_code, operations_used = manipulator.manipulate(tensor, args['depth'])

        input_tensors = dict()
        output_tensors = dict()

        input_tensors[0] = tensor
        exec(exec_code) # this defines tensor var
        output_tensors[0] = eval(eval_code)

        if not "randint" in args['chosen_initiator']:
            args['how_many'] = len(args['chosen_initiator'])-1

        for i in range(1,args['how_many']):
            tensor, code = gen.generate_from_shape(shape)
            input_tensors[i] = tensor
            # print(exec_code)
            exec(exec_code) # this defines tensor var
            output_tensors[i] = eval(eval_code)

        ret = dict()
        ret['shape'] = shape
        ret['manipulation_code'] = exec_code
        ret['input_tensors'] = input_tensors
        ret['expected_tensors'] = output_tensors
        ret['manipulator_used'] = operations_used
        return ret
    except Exception as e:
        print(e)
        return tensor_generator(args)