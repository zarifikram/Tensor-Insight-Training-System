import torch
import random
op = ["randint", "zeros", "ones", "arange"]
class TensorGenerator:
    """
    Generates a random tensor. Outputs both tensor and its corresponding code.
    """

    def __init__(self, max_dim=3, max_shape=5, max_val=10,operations=op):
        self.max_dim = max_dim
        self.max_shape = max_shape
        self.max_val = max_val
        self.operations = operations

    def generate_from_shape(self, shape):
        operation = random.choice(self.operations)
        random_tensor, code = self.get_tensor_from_operation_and_shape(
            operation, shape
        )
        if operation != "randint":
            self.operations.remove(operation)
        return random_tensor, code
    
    def generate(self):
        random_tensor_shape = self.get_random_shape()
        operation = random.choice(self.operations)
        random_tensor, code = self.get_tensor_from_operation_and_shape(
            operation, random_tensor_shape
        )
        return random_tensor, code

    def get_random_shape(self):
        num_dimensions = random.randint(
            1, self.max_dim
        )  # Choose a random number of dimensions
        shape = [
            random.randint(1, self.max_shape) for _ in range(num_dimensions)
        ]  # Random size for each dimension
        return tuple(shape)

    def get_tensor_from_operation_and_shape(self, operation_str, shape):
        if operation_str == "randint":
            return self._randint(shape)
        if operation_str == "zeros":
            return self._zeros(shape)
        if operation_str == "ones":
            return self._ones(shape)
        if operation_str == "arange":
            return self._arange(shape)

    def _randint(self, shape):
        """Creates the tensor and its corresponding code for the randint operation.

        Args:
            shape (Tuple): The shape of the tensor.

        Returns:
            Tuple[Tensor, Str]: The tensor and its corresponding code.
        """

        return (
            torch.randint(-self.max_val, self.max_val, shape, dtype=torch.long),
            f"torch.randint(-{self.max_val}, {self.max_val}, {shape}, dtype=torch.long)",
        )

    def _zeros(self, shape):
        """Creates the tensor and its corresponding code for the zeros operation.

        Args:
            shape (Tuple): The shape of the tensor.

        Returns:
            Tuple[Tensor, Str]: The tensor and its corresponding code.
        """
        return torch.zeros(shape, dtype=torch.long), f"torch.zeros({shape}, dtype=torch.long)"

    def _ones(self, shape):
        """Creates the tensor and its corresponding code for the ones operation.

        Args:
            shape (Tuple): The shape of the tensor.

        Returns:
            Tuple[Tensor, Str]: The tensor and its corresponding code.
        """
        return torch.ones(shape, dtype=torch.long), f"torch.ones({shape}, dtype=torch.long)"

    def _arange(self, shape):
        """Creates the tensor and its corresponding code for the arange operation.

        Args:
            shape (Tuple): The shape of the tensor.

        Returns:
            Tuple[Tensor, Str]: The tensor and its corresponding code.
        """
        # size will the product of all the elements in the shape
        size = 1
        for dim in shape:
            size *= dim
        return torch.arange(size, dtype=torch.long).reshape(shape), f"torch.arange({size}, dtype=torch.long).reshape({shape})"