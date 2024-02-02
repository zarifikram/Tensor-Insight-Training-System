import torch
import random
op = [
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

class TensorManipulator:
    """Responsibility: Manipulate a tensor in some way (e.g, call random Torch API functions on it based on its shape, generate another tensor and perform some operation on them)"""

    def __init__(self, operations=op):
        self.operations2 = ['argsort', 'scatter', 'cat', 'chunk', 'clone', 'contiguous', 'cumprod', 'cumsum', 'diagonal', 'expand', 'flatten', 'index_select', 'masked_fill', 'masked_scatter', 'narrow', 'permute', 'repeat', 'reshape', 'roll', 'select', 'split', 'squeeze', 'stack', 't', 'take', 'transpose', 'unbind', 'unfold', 'unsqueeze', 'view', 'view_as', 'where', 'zero_']
        self.operations = operations

    def manipulate(self, tensor, depth):
        """Manipulates the tensor by applying random operations on it.
        """
        manipulated_tensors = []
        final_code = ""
        operations_used = []
        eval_code = ""
        for i in range(depth):
            payload, operation = self.manipulate_tensor(tensor)
            manipulated_tensor, exec_code, eval_code = payload
            final_code += exec_code + "\n"
            exec_code, eval_code = self.transition_between_layers(tensor)
            final_code += exec_code + "\n"
            manipulated_tensors.append(manipulated_tensor)
            tensor = manipulated_tensor
            operations_used.append(operation)
        
        return manipulated_tensors, final_code, eval_code, set(operations_used)

    def transition_between_layers(self, tensor:torch.tensor) -> tuple[str, str]:
        """returns the code to transition between layers

        Args:
            tensor (Torch.tensor): _description_
        """
        return f"tensor = o_tensor", "o_tensor"
    def manipulate_tensor(self, tensor):
        # step 1 : cross out the operations that are not applicable to the tensor
        operations = self._filter_operations(tensor)
        # step 2 : randomly choose an operation
        operation = random.choice(operations)
        # step 3 : apply the operation
        # if len(tensor.shape) < 2:
        #     print(tensor)
        try:
            return self._apply_operation(tensor, operation), operation
        except:
            print(tensor)
            print(len(tensor.shape))
            print(operation)
            raise
        return self._apply_operation(tensor, operation), operation

    def _filter_operations(self, tensor):
        """Filters out operations that are not applicable to the tensor.

        Args:
            tensor (Tensor): The tensor to filter operations for.

        Returns:
            List[Str]: The list of applicable operations.
        """
        operations = self.operations.copy()

        if "masked_select" in operations:
                operations.remove("masked_select")

        if tensor.numel() < 6:
            if "tenosr_split" in operations:
                operations.remove("tensor_split")
        if len(tensor.shape) != 2:
            if "t" in operations:
                operations.remove("t")
        
        if len(tensor.shape) < 2:
            # remove the operations that reduce the dimensionality of the tensor
            if "gather" in operations:
                operations.remove("gather")
            if "movedim" in operations:
                operations.remove("movedim")
            if "unsqueeze" in operations:
                operations.remove("unsqueeze")
            if "argmax" in operations:
                operations.remove("argmax")
            if "argmin" in operations:
                operations.remove("argmin")
            
        
        if (tensor == 1).all():
            if "clip" in operations:
                operations.remove("clip")
            
        if (tensor == 0).all():
            if "argwhere" in operations:
                operations.remove("argwhere")
            if "clip" in operations:
                operations.remove("clip")
        if len(tensor.shape) == 0:
            operations = ['unsqueeze']
        return operations
    
    def _apply_operation(self, tensor, operation):
        """Applies the operation on the tensor and returns the code.

        Args:
            tensor (Tensor): The tensor to apply the operation on.
            operation (Str): The operation to apply.

        Returns:
            Tensor: The manipulated tensor.
        """
        if operation == "argwhere":
            return self._argwhere(tensor)
        if operation == "tensor_split":
            return self._tensor_split(tensor)
        if operation == "gather":
            return self._gather(tensor)
        if operation == "masked_select":
            return self._masked_select(tensor)
        if operation == "movedim":
            return self._movedim(tensor)
        if operation == "splicing":
            return self._splicing(tensor)
        if operation == "scatter":
            return self._scatter(tensor)
        if operation == "t":
            return self._t(tensor)
        if operation == "take":
            return self._take(tensor)
        if operation == "tile":
            return self._tile(tensor)
        if operation == "unsqueeze":
            return self._unsqueeze(tensor)
        if operation == "negative":
            return self._negative(tensor)
        if operation == "positive":
            return self._positive(tensor)
        if operation == "where":
            return self._where(tensor)
        if operation == "remainder":
            return self._remainder(tensor)
        if operation == "clip":
            return self._clip(tensor)
        if operation == "argmax":
            return self._argmax(tensor)
        if operation == "argmin":
            return self._argmin(tensor)
        if operation == "sum":
            return self._sum(tensor)
        if operation == "unique":
            return self._unique(tensor)
        
    def _argwhere(self, tensor):
        return torch.argwhere(tensor), "o_tensor = torch.argwhere(tensor)", "o_tensor"

    def _tensor_split(self, tensor):
        dim = random.randint(0, len(tensor.shape)-1)
        split_size = random.randint(2, 3)
        tuple_ind = random.randint(0, len(torch.split(tensor, split_size, dim=dim)) - 1)
        return torch.split(tensor, split_size, dim=dim)[tuple_ind], f"o_tensor = torch.split(tensor, {split_size}, dim={dim})[{tuple_ind}]", "o_tensor"

    def _gather(self, tensor):
        # step 1 : randomly choose a dimension
        dim = random.randint(0, len(tensor.shape)-1)
        shape_of_dim = tensor.shape[dim]

        # step 2 : get indices
        indices_shape = list(tensor.shape)
        indices_shape[dim] = random.randint(2, 5)
        indices = torch.randint(0, shape_of_dim, indices_shape)
        return torch.gather(tensor, dim, indices), f"indices = torch.tensor({indices.tolist()})\no_tensor = torch.gather(tensor, {dim}, indices)", f"o_tensor"

    def _masked_select(self, tensor):
        indices = torch.randint(0, 2, tensor.shape).bool()
        return torch.masked_select(tensor, indices), f"indices = torch.tensor({indices.tolist()})\no_tensor = torch.masked_select(tensor, indices)", f"o_tensor"

    def _movedim(self, tensor):
        dim1 = random.randint(0, len(tensor.shape)-1)
        dim2 = random.choice([i for i in range(len(tensor.shape)) if i != dim1])
        return torch.movedim(tensor, dim1, dim2), f"o_tensor = torch.movedim(tensor, {dim1}, {dim2})", "o_tensor"

    def _splicing(self, tensor):
        tensor = tensor.clone()
        input_shape = tensor.size()
        start_indices = [torch.randint(0, size, (1,)).item() for size in input_shape]
        end_indices = [torch.randint(start+1, size+1, (1,)).item() for start, size in zip(start_indices, input_shape)]
        slices = tuple(slice(start, end) for start, end in zip(start_indices, end_indices))
        return tensor[slices], f"o_tensor = tensor[{slices}]", "o_tensor"

    def _scatter(self, tensor):
        pass

    def _t(self, tensor):
        return torch.t(tensor), "o_tensor = torch.t(tensor)", "o_tensor"

    def _take(self, tensor):
        total_size = tensor.numel()
        indices = torch.randint(0, total_size, (random.randint(1, total_size),))
        return torch.take(tensor, indices), f"indices = torch.tensor({indices.tolist()})\no_tensor = torch.take(tensor, indices)", "o_tensor"

    def _tile(self, tensor):
        n_dim = len(tensor.shape)
        dims_length = random.randint(max(1, n_dim-1), n_dim + 1)
        dims = tuple([random.randint(1, 2) for _ in range(dims_length)])
        return torch.tile(tensor, dims), f"o_tensor = torch.tile(tensor, {dims})", "o_tensor"

    def _positive(self, tensor):
        tensor = tensor.clone()
        input_shape = tensor.size()
        start_indices = [torch.randint(0, size, (1,)).item() for size in input_shape]
        end_indices = [torch.randint(start+1, size+1, (1,)).item() for start, size in zip(start_indices, input_shape)]
        slices = tuple(slice(start, end) for start, end in zip(start_indices, end_indices))
        tensor[slices] = torch.positive(tensor[slices])
        # return the manipulated tensor and the code
        return tensor, f"o_tensor=tensor.clone()\no_tensor[{slices}] = torch.positive(o_tensor[{slices}])", "o_tensor"

    def _negative(self, tensor):
        tensor = tensor.clone()
        input_shape = tensor.size()
        start_indices = [torch.randint(0, size, (1,)).item() for size in input_shape]
        end_indices = [torch.randint(start+1, size+1, (1,)).item() for start, size in zip(start_indices, input_shape)]
        slices = tuple(slice(start, end) for start, end in zip(start_indices, end_indices))
        tensor[slices] = torch.negative(tensor[slices])
        # return the manipulated tensor and the code
        return tensor, f"o_tensor=tensor.clone()\no_tensor[{slices}] = torch.negative(o_tensor[{slices}])", "o_tensor"
    
    def _where(self, tensor):
        # step 1 : randomly choose some condition : gt, equal. and value \in {-2, -1, 0, 1, 2}
        condition_value = random.randint(-2, 2)
        choice = random.randint(0, 1)
        condition_tensor = [tensor > condition_value, tensor == condition_value][choice]
        operation_choice = [">", "=="][choice]
        # step 2 : choose true value and false value
        true_value = random.choice([0, 1, 100])
        false_value = random.choice([-69, -1, -100])
        # step 3 : apply the operation where(condition, true_value, false_value)
        return torch.where(condition_tensor, true_value, false_value), f"o_tensor = torch.where(tensor {operation_choice} {condition_value}, {true_value}, {false_value})", "o_tensor"
    
    def _remainder(self, tensor):
        remainder = random.randint(1, 10)
        return torch.remainder(tensor, remainder), f"o_tensor = torch.remainder(tensor, {remainder})", "o_tensor"

    def _clip(self, tensor):
        tensor = tensor.clone()
        input_shape = tensor.size()
        start_indices = [torch.randint(0, size, (1,)).item() for size in input_shape]
        end_indices = [torch.randint(start+1, size+1, (1,)).item() for start, size in zip(start_indices, input_shape)]

        slices = tuple(slice(start, end) for start, end in zip(start_indices, end_indices))
        clip_min, clip_max = -4, 4
        tensor[slices] = torch.clip(tensor[slices], clip_min, clip_max)
        # return the manipulated tensor and the code
        return tensor, f"o_tensor=tensor.clone()\no_tensor[{slices}] = torch.clip(o_tensor[{slices}], {clip_min}, {clip_max})", "o_tensor"

    def _argmax(self, tensor):
        dim = random.randint(0, len(tensor.shape)-1)
        return torch.argmax(tensor, dim=dim), f"o_tensor = torch.argmax(tensor, dim={dim})", "o_tensor"

    def _argmin(self, tensor):
        dim = random.randint(0, len(tensor.shape)-1)
        return torch.argmin(tensor, dim=dim), f"o_tensor = torch.argmin(tensor, dim={dim})", "o_tensor"

    def _sum(self, tensor):
        dim = random.randint(0, len(tensor.shape)-1)
        return torch.sum(tensor, dim=dim), f"o_tensor = torch.sum(tensor, dim={dim})", "o_tensor"

    def _unique(self, tensor):
        #step 1 : randomly choose a dimension
        dim = random.randint(0, len(tensor.shape)-1)
        #step 2 : apply the operation
        return torch.unique(tensor, dim=dim), f'o_tensor = torch.unique(tensor, dim={dim})', "o_tensor"

    def _unsqueeze(self, tensor):
        dim = random.randint(0, len(tensor.shape))
        return torch.unsqueeze(tensor, dim=dim), f"o_tensor = torch.unsqueeze(tensor, dim={dim})", "o_tensor"