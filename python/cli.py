import os
import git
import argparse

def replace_parameter(file, search ,param):
    with open(file, 'r') as f:
        lines = f.readlines()

    with open(file, 'w') as f:
        for line in lines:
            f.write(line.replace(search, param))

def renam_file(file, replace):
   os.rename(file, f"{replace}.php")

# Argumentos
parser = argparse.ArgumentParser()
parser.add_argument('--name', required=True, help='Nombre de la carpeta')  
parser.add_argument('--namespace', required=True, help='Espacio de nombres a reemplazar')
args = parser.parse_args()

# Clona el repositorio
repo_url = 'https://github.com/jerexxypunto/vite-for-wp-example-react.git'
repo_name = args.name
git.Repo.clone_from(repo_url, repo_name)
git.Repo.branches.fget

# Busca y reemplaza en archivos
for root, dirs, files in os.walk(repo_name):
  for file in files:
    file_path = os.path.join(root, file)
    replace_parameter(file_path, "vite_for_wp" ,args.namespace)
    replace_parameter(file_path, "Vite for WP example" ,args.name)

   

print('Búsqueda y reemplazo completados')
