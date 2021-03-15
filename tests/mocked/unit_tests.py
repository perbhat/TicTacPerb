import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.abspath('../../'))
from app import add_user
import models

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

INITIAL_USERNAME = 'user1'

class AddUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: 'perbhat',
                KEY_EXPECTED: [INITIAL_USERNAME, 'perbhat'],
            },
            {
                KEY_INPUT: 'nishi',
                KEY_EXPECTED: [INITIAL_USERNAME, 'perbhat', 'nishi'],
            },
            {
                KEY_INPUT: 'tejas',
                KEY_EXPECTED: [INITIAL_USERNAME, 'perbhat', 'nishi', 'tejas'],
            },
        ]
        
        initial_player = models.Player(username=INITIAL_USERNAME, score=100)
        self.initial_db_mock = [initial_player]
    
    def mocked_db_session_add(self, username):
        self.initial_db_mock.append(username)
    
    def mocked_db_session_commit(self):
        pass
    
    def mocked_player_query_all(self):
        return self.initial_db_mock
    
    def test_success(self):
        for test in self.success_test_params:
            with patch('app.DB.session.add', self.mocked_db_session_add):
                with patch('app.DB.session.commit', self.mocked_db_session_commit):
                    with patch('models.Player.query') as mocked_query:
                        mocked_query.all = self.mocked_player_query_all
    
                        # print(self.initial_db_mock)
                        actual_result = add_user(test[KEY_INPUT])
                        print(actual_result)
                        expected_result = test[KEY_EXPECTED]
                        # print(self.initial_db_mock)
                        print(expected_result)
                        
                        self.assertEqual(len(actual_result), len(expected_result))
                        self.assertEqual(actual_result[1], expected_result[1])







import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.abspath('../../'))
from app import acquire_leaderboard
import models


KEY_EXPECTED = "expected"
ADD_USER = "add"
INITIAL_USERNAME = 'user1'

class AcquireLeaderboardTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                ADD_USER: "perbhat",
                KEY_EXPECTED: [[INITIAL_USERNAME, 100], ['perbhat', 100]],
            },
            {
                ADD_USER: "nishi",
                KEY_EXPECTED: [[INITIAL_USERNAME, 100], ['perbhat', 100], ['nishi', 100]],
            },
            {
                ADD_USER: "anuja",
                KEY_EXPECTED: [[INITIAL_USERNAME, 100], ['perbhat', 100], ['nishi', 100], ['tejas', 100]],
            }
        ]
        
        initial_player = models.Player(username=INITIAL_USERNAME, score=100)
        self.initial_db_mock = [initial_player]
    
    def mocked_db_session_add(self, username):
        self.initial_db_mock.append(username)
    
    def mocked_db_session_commit(self):
        pass
    
    def mocked_player_query_all(self):
        return self.initial_db_mock
    
    def test_success(self):
        for test in self.success_test_params:
            with patch('app.DB.session.add', self.mocked_db_session_add):
                with patch('app.DB.session.commit', self.mocked_db_session_commit):
                    with patch('models.Player.query') as mocked_query:
                        mocked_query.all = self.mocked_player_query_all
                        player_1 = models.Player(username=test[ADD_USER], score=100)
                        self.initial_db_mock.append(player_1)
                        # print(self.initial_db_mock)
                        actual_result = acquire_leaderboard()
                        print(actual_result)
                        expected_result = test[KEY_EXPECTED]
                        # print(self.initial_db_mock)
                        print(expected_result)
                        
                        self.assertEqual(len(actual_result), len(expected_result))
                        self.assertEqual(actual_result[1], expected_result[1])


if __name__ == '__main__':
    unittest.main()