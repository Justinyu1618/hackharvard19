from app import create_app
from flask import Flask
import os

master_app = create_app()

if __name__ == "__main__":
	port = int(os.environ.get("PORT", 5000))
	master_app.run(host="0.0.0.0", port=port, debug=True)