BarCamp Green Bay
=================

BarCamp Green Bay web site.

## Installation

- Clone the source.
- `vagrant up`
- `vagrant ssh`
- `ifconfig` to grab the ip address
- load ip address in browser

## Planned Architecture

- Ansible for provisioning
- Docker for deployment
- Nginx proxy
- Multiple nodejs processes (web and api)
- Polymer

## TODO

- [x] vagrant development environment
  - [ ] proper shared folder - [#1](https://github.com/BarCampGreenBay/barcampgb.org/issues/1)
- [x] ansible provisioning
- [x] nginx proxy
- [x] multiple node processes
- [ ] mongodb management
- [ ] polymer front-end setup
- [ ] port existing features
- [ ] production environment with docker
