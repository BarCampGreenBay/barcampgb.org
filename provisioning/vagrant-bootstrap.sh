sudo apt-get upgrade
sudo apt-get install -y ansible
cd /vagrant/provisioning
ansible-playbook -i hosts-dev playbook.yml