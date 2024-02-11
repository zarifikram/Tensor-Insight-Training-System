from . import tensor_generator
import json
from math import sqrt
from problem.models import Problem,TestCase


ci = ["randint", "zeros", "ones", "arange"]
cm = [
        "argwhere",
        "tensor_split",
        "gather",
        "masked_select",
        "movedim",
        "splicing",
        "t",
        "take",
        "tile",
        "unsqueeze",
        "negative",
        "positive",
        "where",
        "remainder",
        "clip",
        "argmax",
        "argmin",
        "sum",
        "unique",
    ]
def generate_problem(depth,chosen_initiator=ci,chosen_manipulator=cm):
    try:
        args = dict()
        args['chosen_initiator'] = chosen_initiator
        args['chosen_manipulator'] = chosen_manipulator

        if depth==0:
            depth = 1
        args['depth'] = depth

        if not "randint" in args['chosen_initiator']:
            args['how_many'] = len(args['chosen_initiator'])
        else:
            args['how_many'] = 5

        generated_problem = tensor_generator.tensor_generator(args)

        difficulty = args['depth']*0.5+0.3*len(generated_problem['shape'])+0.2*max(generated_problem['shape']) 
        
        problem = Problem.objects.create(
            used_manipulator=json.dumps(list(generated_problem['manipulator_used'])),
            depth=depth,
            difficulty=difficulty,
            shape=json.dumps(generated_problem['shape']),
            solution = generated_problem['manipulation_code']
        )

        for j in range(args['how_many']):
            inp = generated_problem['input_tensors'][j].numpy()
            inp = json.dumps(inp.tolist())
            out = generated_problem['expected_tensors'][j].numpy()
            out = json.dumps(out.tolist())
            TestCase.objects.create(
                problem=problem,
                input=inp,
                output=out,
                test_case_no=j+1
            )
        return problem
    except:
        return generate_problem(depth,chosen_initiator,chosen_manipulator)

def generate_custom_problem(depth,chosen_initiator=ci,chosen_manipulator=cm):
    try:
        args = dict()
        args['chosen_initiator'] = chosen_initiator
        args['chosen_manipulator'] = chosen_manipulator
        if depth==0:
            depth = 1
        args['depth'] = depth
        if not "randint" in args['chosen_initiator']:
            args['how_many'] = len(args['chosen_initiator'])
        else:
            args['how_many'] = 5

        generated_problem = tensor_generator.tensor_generator(args)
        used_manipulator=json.dumps(list(generated_problem['manipulator_used']))
        test_cases = []
        for j in range(args['how_many']):
            inp = generated_problem['input_tensors'][j].numpy().tolist()
            out = generated_problem['expected_tensors'][j].numpy().tolist()
            test_cases.append({'input':inp,'output':out,'test_case_no':j+1})
        print(json.dumps(test_cases))
        return used_manipulator,json.dumps(test_cases)
    except:
        return generate_custom_problem(depth,chosen_initiator,chosen_manipulator)
    
def xp_to_level(xp):
    return sqrt(xp)*0.07