cd project-frontend
npm install react-scripts
npm install

cd ../BackendFiles
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createdefaultsuperuser --username PBAdmin --password PBAdmin
