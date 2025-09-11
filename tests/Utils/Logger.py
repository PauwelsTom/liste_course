import time
import os

class Logger:
    def __init__(self, test_name):
        self.log_dir = "Logs"
        self.log_file = f"{self.log_dir}/{test_name}.log"

        self.test_name = test_name
        self.buffer = ""
        self.startTime = time.time()
        self.init_buffer()

    def init_buffer(self):
        """Initialise le buffer avec le nom du test"""
        self.buffer = f"test: {self.test_name}\n\n"

    def end(self):
        """Met une fin de buffer avec le temps écoulé depuis le début et sauvegarde dans le fichier"""
        delta = (time.time() - self.startTime)
        self.buffer += f"END - Temps écoulé: {delta:.2f} secondes"
        self.write_to_file()

    def log(self, message):
        """Ajoute un message dans le log"""
        self.buffer += f"LOG - {message}\n\n"
    
    def warning(self, message):
        """Ajoute un warning au dans le log"""
        self.buffer += f"[WARNING]: {message}\n\n"

    def error(self, message):
        """Ajoute un error au dans le log"""
        self.buffer += f"[ERROR]: {message}\n\n"

    def write_to_file(self):
        """Écrit le buffer dans le fichier"""
        with open(self.log_file, "w") as f:
            f.write(self.buffer)
            print(f"Les logs ont bien été sauvegardés dans le fichier: {self.log_file}")
        self.buffer = ""
