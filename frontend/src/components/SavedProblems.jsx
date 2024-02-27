import React, { useEffect, useState } from 'react'

const savedProblems = [
    {"title": "Problem1", "id": 1, "TestCases": [{"input": "[12, 10, 1]", "output": "[3]"}, {"input": "[2 3]", "output": "[5]"}]},
    {"title": "Problem2", "id": 2, "TestCases": [{"input": "[12, 10, 1]", "output": "[3]"}, {"input": "[2 3]", "output": "[5]"}]},
    {"title": "Problem3", "id": 3, "TestCases": [{"input": "[12, 10, 1]", "output": "[3]"}, {"input": "[2 3]", "output": "[5]"}]},
    {"title": "Problem4", "id": 4, "TestCases": [{"input": "[12, 10, 1]", "output": "[3]"}, {"input": "[2 3]", "output": "[5]"}]},
    {"title": "Problem5", "id": 5, "TestCases": [{"input": "[12, 10, 1]", "output": "[3]"}, {"input": "[2 3]", "output": "[5]"}]},
    {"title": "Problem6", "id": 6, "TestCases": [{"input": "[12, 10, 1]", "output": "[3]"}, {"input": "[2 3]", "output": "[5]"}]},
    {"title": "Problem7", "id": 7, "TestCases": [{"input": "[12, 10, 1]", "output": "[3]"}, {"input": "[2 3]", "output": "[5]"}]},
    {"title": "Problem8", "id": 8, "TestCases": [{"input": "[12, 10, 1]", "output": "[3]"}, {"input": "[2 3]", "output": "[5]"}]},
    {"title": "Problem9", "id": 9, "TestCases": [{"input": "[12, 10, 1]", "output": "[3]"}, {"input": "[2 3]", "output": "[5]"}]},
    {"title": "Problem10", "id": 10, "TestCases": [{"input": "[12, 10, 1]", "output": "[3]"}, {"input": "[2 3]", "output": "[5]"}]}
]
function SavedProblems() {
    const [problems, setProblems] = useState([])

    // use useEffect to fetch the problems from the backend
    // useEffect(() => {
    //     fetch('http://127.0.0.1:8000/api/problem/get-saved/', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'X-CSRFToken': 'csrfToken',
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         setProblems(data)
    //     })
    //     .catch(error => {
    //         console.error('Error fetching saved problems:', error);
    //     }
    //     )
    // }, [])


  return (
    <div className='flex justify-center items-center flex-col'>
        {savedProblems.map(problem => (
            <Problem problem={problem} />
        
        ))}

    </div>



  )
}

export default SavedProblems

const Problem = ({problem}) => {
    return (
        <div className='flex bg-red-100 mb-4 rounded-xl items-center'>
            <h3 className='text-black'>{problem.title}</h3>
            <div className='ml-12 flex'>
                <button className='bg-red-200 p-4 rounded-xl'>View</button>
                <button className='bg-red-200 p-4 rounded-xl'>Delete</button>
            </div>
            <div>
                {problem.TestCases.map(testCase => (
                    <div>
                        <p>{testCase.input}</p>
                        <p>{testCase.output}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}