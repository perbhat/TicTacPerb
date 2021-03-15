'''
    update_users_test.py
    
    Fill in what this test is for here
'''

import unittest
import os
import sys
sys.path.append(os.path.abspath('../../'))
from app import on_update
from app import add_score


UPDATE_INPUT = "update"
EXPECTED_OUTPUT = "Expected"


class UpdateUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
  
                UPDATE_INPUT: {
                    'board': ['X', None, None, None, None, None, 'X', None, None],
                },
                EXPECTED_OUTPUT: {
                    'board': ['X', None, None, None, None, None, 'X', None, None],
                }
            },
            {
                UPDATE_INPUT: {
                    'board': ['X', None, None, None, None, None, None, None, None],
                },
                EXPECTED_OUTPUT: {
                    'board': ['X', None, None, None, None, None, None, None, None],
                }
            },
            {
                UPDATE_INPUT: {
                    'board': ['X', None, None, 'X', None, None, 'O', None, None],
                },
                EXPECTED_OUTPUT: {
                    'board': ['X', None, None, 'X', None, None, 'O', None, None],
                }
            },
            # TODO add another test case
        ]

    def test_add_user(self):
        for test in self.success_test_params:
            # TODO: Make a call to add user with your test inputs
            # then assign it to a variable
            actual_result = on_update(test[UPDATE_INPUT])
            
            # Assign the expected output as a variable from test
            expected_result = test[EXPECTED_OUTPUT]

            # Use assert checks to see compare values of the results
            self.assertEqual(actual_result['board'], expected_result['board'])
            self.assertEqual(len(actual_result['board']), len(expected_result['board']))



SCORE_INPUT = 'score'
ADD_SCORE = 'add'
class AddScoreTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                SCORE_INPUT: 4,
                ADD_SCORE: 1,
                EXPECTED_OUTPUT: 5,
                
            },
            {
                SCORE_INPUT: 4,
                ADD_SCORE: 3,
                EXPECTED_OUTPUT: 7,
            },
            {
                SCORE_INPUT: 7,
                ADD_SCORE: 0,
                EXPECTED_OUTPUT: 7,
            },
            
        ]
    def test_add_score(self):
        for test in self.success_test_params:
            actual_result = add_score(test[SCORE_INPUT], test[ADD_SCORE])
            expected_result = test[EXPECTED_OUTPUT]
            self.assertEqual(test[SCORE_INPUT], expected_result-test[ADD_SCORE])
            self.assertEqual(actual_result, expected_result)

        

if __name__ == '__main__':
    unittest.main()
    


