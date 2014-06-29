ROOT=/vagrant/provisioning
sudo apt-get upgrade
sudo apt-get install -y ansible
ansible-playbook -i $ROOT/hosts-dev $ROOT/playbook.yml