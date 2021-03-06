import time
from hamcrest import (
    assert_that,
    has_entries,
    close_to,
)

from pynformatics.model.participant import Participant
from pynformatics.model.statement import Statement
from pynformatics.model.user import User
from pynformatics.testutils import TestCase


class TestAPI__statement_finish(TestCase):
    def setUp(self):
        super(TestAPI__statement_finish, self).setUp()

        self.user = User()
        self.session.add(self.user)

        self.now = time.time()
        self.duration = 290
        self.statement = Statement(
            olympiad=1,
            time_start=self.now - 10,
            time_stop=self.now + self.duration,
        )
        self.session.add(self.statement)

        self.session.flush()

        self.actual_duration = 5
        self.participant = Participant(
            user_id=self.user.id,
            statement_id=self.statement.id,
            start=int(self.now - self.actual_duration),
            duration=self.duration,
        )
        self.session.add(self.participant)

    def test_simple(self):
        self.set_session({'user_id': self.user.id})
        response = self.app.post('/statement/%s/finish' % self.statement.id, {})
        assert_that(
            response.json,
            has_entries({
                'statement_id': self.statement.id,
                'start': int(self.now - self.actual_duration),
                'duration': close_to(self.actual_duration, 1),
            })
        )
