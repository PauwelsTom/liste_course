from Logger import Logger
import os

class TestRunner:
    def __init__(self):
        self.logger = Logger()
        self.url = os.getenv("SITE_URL")

    def run(self, page, instructions, test_name):
        """Run les instructions données"""
        try:
            instructions(page, self.url, self.logger)
        except Exception:
            print(f"Test {test_name} has failed...")
        finally:
            self.logger.end()
