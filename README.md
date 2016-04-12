=================
Vern Project
=================

-----------------
Development setup
-----------------

Install required system packages:

.. code-block:: bash

    $ sudo apt-get install python-pip
    $ sudo apt-get install libmysqlclient-dev
    $ sudo apt-get install libffi-dev libssl-dev
    $ sudo apt-get install libxml2-dev libxslt1-dev python-dev
    
Create www directory where project sits and environment dir

.. code-block:: bash

    $ mkdir /var/www && mkdir /var/envs && mkdir /var/envs/bin
    
Install virtualenvwrapper

.. code-block:: bash

    $ pip install virtualenvwrapper
    
    
Add these to your bashrc virutualenvwrapper work

.. code-block:: bash

    export WORKON_HOME=/var/envs
    export PROJECT_HOME=/var/www
    export VIRTUALENVWRAPPER_HOOK_DIR=/var/envs/bin
    source /usr/local/bin/virtualenvwrapper.sh
    
Create virtualenv

.. code-block:: bash

    $ cd /var/envs && mkvirtualenv vern
    
Install requirements for a project.

.. code-block:: bash

    $ cd /var/www/vern && pip install -r requirements/local.txt
    
    $ pip install pyopenssl ndg-httpsclient pyasn1
