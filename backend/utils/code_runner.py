import torch
import json
def evaluate_code(user_code: str, problem_dict: dict) -> dict:
    """
    Evaluates the user code against the test cases and returns the results
    :param user_code: The user's code
    :param problem_dict: The problem dictionary
    :return: The results of the test cases
    """
    # usercode should change the variable `tensor`
    test_cases = problem_dict["test_cases"]
    num_test_cases = len(test_cases)
    num_test_cases_passed = 0
    result_dict = dict()
    for test_case_id, test_case_dict in enumerate(test_cases):
        # Reset the tensor
        input_string = test_case_dict["input"]
        tensor = torch.tensor(eval(input_string))
        o_tensor = tensor.clone()
        # Run the user code
       
        namespace = {'tensor': tensor, 'o_tensor': tensor.clone(), "torch": torch}
        try:
            exec(user_code, namespace)
        except Exception as e:
            result_dict[test_case_id] = {"status": "error", "error": str(e)}
            continue
        
        test_case_result = dict()
        test_case_result["status"] = "success"
        # Check the output
        output_string = test_case_dict["output"]
        o_tensor = torch.tensor(eval(output_string))

        tensor = namespace['tensor']

        test_case_result["output"] = json.dumps(tensor.numpy().tolist())

        if torch.equal(tensor, o_tensor):
            test_case_result["correct"] = True
            num_test_cases_passed += 1
        else:
            test_case_result["correct"] = False
        result_dict[test_case_id] = test_case_result

    ret = dict()
    ret['num_test_cases'] = num_test_cases
    ret['num_test_cases_passed'] = num_test_cases_passed
    ret['result'] = result_dict

    return ret

# # Example 1
# print("Example 1")
# user_provided_code = """
# o_tensor = torch.where(tensor == 2, 100, -1)
# tensor = o_tensor
# """

# problem_dict = {
    # "test_cases": [
    #     {
    #         "input": "[0]",
    #         "output": "[-1]",
    #         "test_case_no": 1
    #     },
    #     {
    #         "input": "[1]",
    #         "output": "[-1]",
    #         "test_case_no": 2
    #     },
    #     {
    #         "input": "[0]",
    #         "output": "[-1]",
    #         "test_case_no": 3
    #     },
    #     {
    #         "input": "[-3]",
    #         "output": "[-1]",
    #         "test_case_no": 4
    #     },
    #     {
    #         "input": "[7]",
    #         "output": "[-1]",
    #         "test_case_no": 5
    #     }
    # ]
# }

# result = evaluate_code(user_provided_code, problem_dict)
# print(result)

# # Example 2
# print("\n\nExample 2")
# user_provided_code = """
# o_tensor = torch.unique(tensor, dim=1)
# tensor = o_tensor
# o_tensor = torch.unique(tensor, dim=0)
# tensor = o_tensor
# """

# problem_dict = {
#     "test_cases": [
#         {
#             "input": "[[-6, -2], [6, 2]]",
#             "output": "[[-6, -2], [6, 2]]",
#             "test_case_no": 1
#         },
#         {
#             "input": "[[-10, -5], [-1, -8]]",
#             "output": "[[-10, -5], [-1, -8]]",
#             "test_case_no": 2
#         },
#         {
#             "input": "[[-2, -5], [-10, 1]]",
#             "output": "[[-5, -2], [1, -10]]",
#             "test_case_no": 3
#         },
#         {
#             "input": "[[9, 2], [9, 2]]",
#             "output": "[[2, 9]]",
#             "test_case_no": 4
#         },
#         {
#             "input": "[[-6, 8], [-5, -4]]",
#             "output": "[[-6, 8], [-5, -4]]",
#             "test_case_no": 5
#         }
#     ]
# }

# result = evaluate_code(user_provided_code, problem_dict)
# print(result)

# # Example 3
# print("\n\nExample 3")
# user_provided_code = """
# o_tensor=tensor.clone()
# o_tensor[(slice(1, 4, None),)] = torch.positive(o_tensor[(slice(1, 4, None),)])
# tensor = o_tensor
# o_tensor=tensor.clone()
# o_tensor[(slice(2, 4, None),)] = torch.clip(o_tensor[(slice(2, 4, None),)], -4, 4)
# tensor = o_tensor
# o_tensor=tensor.clone()
# o_tensor[(slice(2, 4, None),)] = torch.clip(o_tensor[(slice(2, 4, None),)], -4, 4)
# tensor = o_tensor
# o_tensor=tensor.clone()
# o_tensor[(slice(1, 4, None),)] = torch.clip(o_tensor[(slice(1, 4, None),)], -4, 4)
# tensor = o_tensor
# """

# problem_dict = {
#     "test_cases": [
#         {
#             "input": "[0, 5, -2, 2]",
#             "output": "[0, 4, -2, 2]",
#             "test_case_no": 1
#         },
#         {
#             "input": "[-7, 2, 6, -4]",
#             "output": "[-7, 2, 4, -4]",
#             "test_case_no": 2
#         },
#         {
#             "input": "[-8, 7, 0, -1]",
#             "output": "[-8, 4, 0, -1]",
#             "test_case_no": 3
#         },
#         {
#             "input": "[-3, 8, 2, -8]",
#             "output": "[-3, 4, 2, -4]",
#             "test_case_no": 4
#         },
#         {
#             "input": "[3, 5, 3, -7]",
#             "output": "[3, 4, 3, -4]",
#             "test_case_no": 5
#         }
#     ]
# }

# result = evaluate_code(user_provided_code, problem_dict)
# print(result)


# # Example 4
# print("\n\nExample 4")
# user_provided_code = """
# o_tensor=tensor.clone()
# o_tensor[(slice(0, 1, None), slice(2, 3, None), slice(1, 3, None))] = torch.positive(o_tensor[(slice(0, 1, None), slice(2, 3, None), slice(1, 3, None))])
# tensor = o_tensor
# o_tensor = torch.sum(tensor, dim=2)
# tensor = o_tensor
# o_tensor = torch.unique(tensor, dim=1)
# tensor = o_tensor
# o_tensor=tensor.clone()
# o_tensor[(slice(0, 1, None), slice(0, 2, None))] = torch.positive(o_tensor[(slice(0, 1, None), slice(0, 2, None))])
# tensor = o_tensor
# """

# problem_dict = {
#     "test_cases": [
#         {
#             "input": "[[[-1, -5, 5], [9, 8, 5], [-7, 2, 6]]]",
#             "output": "[[-1, 1, 22]]",
#             "test_case_no": 1
#         },
#         {
#             "input": "[[[3, -2, 7], [8, -8, -9], [-8, -2, -10]]]",
#             "output": "[[-20, -9, 8]]",
#             "test_case_no": 2
#         },
#         {
#             "input": "[[[1, -2, -3], [9, 5, -3], [-2, 8, -7]]]",
#             "output": "[[-4, -1, 11]]",
#             "test_case_no": 3
#         },
#         {
#             "input": "[[[3, -6, 6], [8, 2, -5], [-2, 3, 3]]]",
#             "output": "[[3, 4, 5]]",
#             "test_case_no": 4
#         },
#         {
#             "input": "[[[0, -2, 2], [9, 4, -3], [-6, 1, 8]]]",
#             "output": "[[0, 3, 10]]",
#             "test_case_no": 5
#         }
#     ]
# }

# result = evaluate_code(user_provided_code, problem_dict)
# print(result)