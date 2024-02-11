from django.core.management.base import BaseCommand
from contest.models import Contest, ContestProblem
from problem.models import Problem, TestCase
from utils.tensor_generator import tensor_generator
import json
from django.utils import timezone
from math import log2

class Command(BaseCommand):
    help = 'Generate problems and insert into the Problem model'

    def handle(self, *args, **options):
        contest = Contest.objects.create()
        args = dict()
        args['chosen_initiator'] = ["randint", "zeros", "ones", "arange"]
        args['chosen_manipulator'] = [
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
        args['how_many'] = 5
        for i in range(20):
            args['depth'] = int(log2(i + 1)) + 1

            generated_problem = tensor_generator(args)

            depth=args['depth']
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
            
            ContestProblem.objects.create(contest=contest, problem=problem, problem_number=i+1)
        
        twenty_four_hours_ago = timezone.now() - timezone.timedelta(hours=24)
        # Update show_code for Problems created more than 24 hours ago
        Problem.objects.filter(addedAt__lte=twenty_four_hours_ago).update(show_code=True)
        
        self.stdout.write(self.style.SUCCESS('Successfully generated and inserted a problem.'))
