from flask import Flask, render_template, session, request
from wtforms import SelectField
from wtforms.validators import InputRequired

from manage import NewsFilter
from flask_wtf import FlaskForm

app = Flask(__name__)
app.config['SECRET_KEY'] = 'FunWithFlags'


@app.route('/')
def home():
    returns = NewsFilter().process()
    return render_template('index.html',
                           content=[returns[0], returns[1]])


if __name__ == "__main__":
    app.run(debug=True)
