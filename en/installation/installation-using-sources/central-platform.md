---
id: central-platform
title: Central Platform
---

The Central Platform of Centreon is composed of:

- Web UI, a graphical interface to administrate, configure and visualize
  everything,
- Gorgone, a task manager for distributed architecture.

The following chapters describe how to install each one of those components.

The tested distributions and versions are:

| Distribution    | Version | Gorgone | Web |
|-----------------|---------|---------|-----|
| CentOS          | 8.3     | o       | o   |
| CentOS          | 7.9     | o       | o   |
| Debian          | 10.8    | o       | o   |
| Ubuntu          | 20.10   | o       | o   |
| openSUSE Leap   | 15.2    | o       | o   |

## Centreon Gorgone

### Prerequisites

To install and run Centreon Gorgone, you will need the following external
dependencies:

- Perl, the Perl interpreter and core modules,
- ZMQ, an asynchronous messaging library,
- libssh development files (for SSH communication),
- Perl libssh, a Perl binding to libssh,
- Perl compilation modules.

#### Common packages

Use the system package manager to install them:

<!--DOCUSAURUS_CODE_TABS-->

<!--CentOS 8-->

```shell
dnf install dnf-plugins-core epel-release
dnf config-manager --set-enabled powertools
dnf install perl-Clone perl-Crypt-CBC perl-DBD-MySQL perl-DBD-SQLite perl-Digest-MD5-File perl-Hash-Merge perl-HTTP-Daemon perl-HTTP-Daemon-SSL perl-HTTP-Message perl-JSON-PP perl-JSON-XS perl-NetAddr-IP perl-Schedule-Cron perl-YAML perl-YAML-LibYAML rrdtool-perl zeromq libssh
dnf install https://github.com/centreon/centreon-gorgone/raw/master/packaging/packages/perl-CryptX-0.068-1.el8.x86_64.rpm https://github.com/centreon/centreon-gorgone/raw/master/packaging/packages/perl-Net-Curl-0.44-1.el8.x86_64.rpm https://github.com/centreon/centreon-gorgone/raw/master/packaging/packages/perl-UUID-0.28-1.el8.x86_64.rpm https://github.com/centreon/centreon-gorgone/raw/master/packaging/packages/perl-ZMQ-LibZMQ4-0.01-1.el8.x86_64.rpm https://github.com/centreon/centreon-gorgone/raw/master/packaging/packages/perl-ZMQ-Constants-1.04-1.el8.noarch.rpm
dnf install https://github.com/garnier-quentin/perl-libssh/raw/master/contrib/RPMS/perl-Libssh-Session-0.8-2.el8.x86_64.rpm
```

<!--CentOS 7-->

```shell
yum install epel-release
yum install perl-Clone perl-Crypt-CBC perl-DBD-MySQL perl-DBD-SQLite perl-Digest-MD5-File perl-HTTP-Daemon perl-HTTP-Daemon-SSL perl-HTTP-Message perl-JSON-PP perl-JSON-XS perl-NetAddr-IP perl-Schedule-Cron perl-YAML rrdtool-perl zeromq zeromq-devel perl-Devel-CheckLib uuid-devel
yum install https://github.com/centreon/centreon-gorgone/raw/master/packaging/packages/perl-CryptX-0.064-1.el7.x86_64.rpm https://github.com/centreon/centreon-gorgone/raw/master/packaging/packages/perl-Hash-Merge-0.300-1.el7.noarch.rpm https://github.com/centreon/centreon-gorgone/raw/master/packaging/packages/perl-Time-ParseDate-2015.103-1.el7.noarch.rpm https://github.com/centreon/centreon-gorgone/raw/master/packaging/packages/perl-YAML-LibYAML-0.80-1.el7.x86_64.rpm https://github.com/centreon/centreon-gorgone/raw/master/packaging/packages/perl-Clone-Choose-0.010-1.el7.noarch.rpm
yum install https://github.com/garnier-quentin/perl-libssh/raw/master/contrib/RPMS/libssh-0.9.4-1.el7.x86_64.rpm https://github.com/garnier-quentin/perl-libssh/raw/master/contrib/RPMS/perl-Libssh-Session-0.8-2.el7.x86_64.rpm
```

<!--Debian / Ubuntu-->

```shell
apt install perl libzmq3-dev libzmq5 libssh-dev libextutils-makemaker-cpanfile-perl libmodule-build-perl libmodule-install-perl libcryptx-perl libschedule-cron-perl libcrypt-cbc-perl libjson-xs-perl libjson-pp-perl libxml-simple-perl libnet-smtp-ssl-perl libconfig-yaml-perl libyaml-libyaml-perl libdbd-sqlite3-perl libdbd-mysql-perl libdbi-perl libdata-uuid-perl libhttp-daemon-perl libhttp-message-perl libmime-base64-perl libdigest-md5-file-perl libwww-curl-perl libhttp-daemon-ssl-perl libnetaddr-ip-perl libhash-merge-perl libdata-clone-perl librrds-perl
```

<!--openSUSE-->

```shell
zypper install perl zeromq zeromq-devel libssh-devel perl-ExtUtils-MakeMaker perl-ExtUtils-MakeMaker-CPANfile perl-Module-Build perl-Module-Install perl-CryptX perl-Crypt-CBC perl-JSON-XS perl-JSON perl-XML-Simple perl-Net-SMTP-SSL perl-YAML perl-YAML-LibYAML perl-DBD-SQLite perl-DBD-mysql perl-DBI perl-Data-UUID perl-HTTP-Daemon perl-HTTP-Message perl-Digest-MD5 perl-Digest-Perl-MD5 perl-HTTPS-Daemon perl-NetAddr-IP perl-Hash-Merge perl-Clone perl-Time-modules perl-rrdtool libcurl-devel perl-ExtUtils-PkgConfig
```

<!--END_DOCUSAURUS_CODE_TABS-->

#### Other packages

Some packages, not available from common package managers repositories, need
to be manually compiled and installed.

You'll find below the ones identified as so. If others were to be missed,
you will need to find them on [CPAN](https://metacpan.org/) and apply the
same process.

##### ZMQ

> Needed for Debian, Ubuntu and openSUSE.

```shell
wget https://cpan.metacpan.org/authors/id/M/MO/MOSCONI/ZMQ-LibZMQ4-0.01.tar.gz
tar zxf ZMQ-LibZMQ4-0.01.tar.gz
cd ZMQ-LibZMQ4-0.01
sed -i -e "s/tools/.\/tools/g" Makefile.PL
perl Makefile.PL
make
make install
```

```shell
wget https://cpan.metacpan.org/authors/id/D/DM/DMAKI/ZMQ-Constants-1.04.tar.gz
tar zxf ZMQ-Constants-1.04.tar.gz
cd ZMQ-Constants-1.04
perl Makefile.PL
make
make install
```

##### Perl libssh binding

> Needed for Debian, Ubuntu and openSUSE.

```shell
git clone https://github.com/garnier-quentin/perl-libssh.git
cd perl-libssh
perl Makefile.PL
make
make install
```

##### Net-Curl

> Needed for openSUSE.

```shell
wget https://cpan.metacpan.org/authors/id/S/SY/SYP/Net-Curl-0.48.tar.gz
tar zxf Net-Curl-0.48.tar.gz
cd Net-Curl-0.48
perl Makefile.PL
make
make install
```

##### Digest-MD5-File

> Needed for openSUSE.

```shell
wget https://cpan.metacpan.org/authors/id/D/DM/DMUEY/Digest-MD5-File-0.08.tar.gz
tar zxf Digest-MD5-File-0.08.tar.gz
cd Digest-MD5-File-0.08
perl Makefile.PL
make
make install
```

##### Schedule-Cron

> Needed for openSUSE.

```shell
wget https://cpan.metacpan.org/authors/id/R/RO/ROLAND/Schedule-Cron-1.01.tar.gz
tar zxf Schedule-Cron-1.01.tar.gz
cd Schedule-Cron-1.01
perl Makefile.PL
make
make install
```

##### UUID

> Needed for CentOS 7.

```shell
wget https://cpan.metacpan.org/authors/id/J/JR/JRM/UUID-0.28.tar.gz
tar zxf UUID-0.28.tar.gz
cd UUID-0.28
perl Makefile.PL
make
make install
```

### Get the sources

Centreon Gorgone can be checked out from the
[GitHub repository](https://github.com/centreon/centreon-gorgone)
or downloaded from Centreon
[download website](https://download.centreon.com/)

<!--DOCUSAURUS_CODE_TABS-->

<!--GitHub repository-->

```shell
git clone -b x.y.z https://github.com/centreon/centreon-gorgone
```

<!--Download website-->

```shell
wget http://files.download.centreon.com/public/centreon-gorgone/centreon-gorgone-x.y.z.tar.gz
tar xzf centreon-gorgone-x.y.z.tar.gz
```

<!--END_DOCUSAURUS_CODE_TABS-->

With x.y.z being the version you want to install.

### Install

Run the installation script:

```shell
./install.sh -i
```

It should result to the following output (here on a Debian 10):

```text
Script requirements                                                  OK
Found distribution                                                   debian 10
Loading distribution specific input variables                        install/inputvars.debian.env
Loading user specific input variables                                inputvars.env
Installation type                                                    central
Installation mode                                                    install


Welcome to Centreon installation script!

Should we start? [Y/n]
> y


Centreon installation requirements
-------------------------------------------------------------------------------------------------
Checking installation requirements                                   OK


Gorgone information
-------------------------------------------------------------------------------------------------
Gorgone user (GORGONE_USER)                                          centreon-gorgone
Gorgone group (GORGONE_GROUP)                                        centreon-gorgone
Gorgone configuration directory (GORGONE_ETC_DIR)                    /etc/centreon-gorgone
Gorgone log directory (GORGONE_LOG_DIR)                              /var/log/centreon-gorgone
Gorgone variable library directory (GORGONE_VARLIB_DIR)              /var/lib/centreon-gorgone
Gorgone cache directory (GORGONE_CACHE_DIR)                          /var/cache/centreon-gorgone
Centreon user (CENTREON_USER)                                        centreon
Centreon home directory (CENTREON_HOME)                              /var/spool/centreon
Centreon configuration directory (CENTREON_ETC_DIR)                  /etc/centreon
Centreon service (CENTREON_SERVICE)                                  centreon
Engine user (ENGINE_USER)                                            centreon-engine
Engine group (ENGINE_GROUP)                                          centreon-engine
Broker user (BROKER_USER)                                            centreon-broker
Broker group (BROKER_GROUP)                                          centreon-broker

Everything looks good, proceed to installation? [y/N]
> y


Build files
-------------------------------------------------------------------------------------------------
Copying files to '/tmp/centreon-setup'                               OK
Replacing macros                                                     OK
Building installation tree                                           OK


Install builded files
-------------------------------------------------------------------------------------------------
Copying files from '/tmp/centreon-setup' to final directory          OK


Install remaining files
-------------------------------------------------------------------------------------------------
Centreon configuration                                               OK
Centreon API configuration                                           OK
Sysconfig Gorgoned configuration                                     OK
Logrotate Gorgoned configuration                                     OK


Update groups memberships
-------------------------------------------------------------------------------------------------
Add user 'centreon-gorgone' to group 'centreon-broker'               OK
Add user 'centreon-gorgone' to group 'centreon-engine'               OK
Add user 'centreon-engine' to group 'centreon-gorgone'               OK
Add user 'centreon-broker' to group 'centreon-gorgone'               OK


Configure and restart services
-------------------------------------------------------------------------------------------------
Enabling service 'gorgoned'                                          OK
Reloading systemctl daemon                                           OK
Restarting service 'gorgoned'                                        OK


You're done!
-------------------------------------------------------------------------------------------------

Take a look at the documentation
https://docs.centreon.com/current.
Thanks for using Gorgone!
```

#### Define specific inputs

Input variables can be defined by using the `inputvars.env` file which is
read by the installation script.

The option `-e` can also be used in command line.

Here is an example to install Gorgone with custom log directory:

```shell
./install.sh -i -e "GORGONE_LOG_DIR=/var/log/gorgone"
```

Below the list of available variables, their description and default value:

| Variable             | Description                                        | Default value                 |
|----------------------|----------------------------------------------------|-------------------------------|
| `INSTALLATION_TYPE`  | Type of installation. Can be `central` or `poller` | `central`                     |
| `GORGONE_USER`       | Gorgone user.                                      | `centreon-gorgone`            |
| `GORGONE_GROUP`      | Gorgone group.                                     | `centreon-gorgone`            |
| `GORGONE_ETC_DIR`    | Gorgone configuration directory.                   | `/etc/centreon-gorgone`       |
| `GORGONE_LOG_DIR`    | Gorgone log directory.                             | `/var/log/centreon-gorgone`   |
| `GORGONE_VARLIB_DIR` | Gorgone variable library directory.                | `/var/lib/centreon-gorgone`   |
| `GORGONE_CACHE_DIR`  | Gorgone cache directory.                           | `/var/cache/centreon-gorgone` |
| `CENTREON_USER`      | Centreon user.                                     | `centreon`                    |
| `CENTREON_HOME`      | Centreon user home directory.                      | `/var/spool/centreon`         |
| `CENTREON_ETC_DIR`   | Centreon configuration directory.                  | `/etc/centreon`               |
| `CENTREON_SERVICE`   | Centreon systemd service name.                     | `centreon`                    |
| `ENGINE_USER`        | Centreon Engine user.                              | `centreon-engine`             |
| `ENGINE_GROUP`       | Centreon Engine group.                             | `centreon-engine`             |
| `BROKER_USER`        | Centreon Broker user.                              | `centreon-broker`             |
| `BROKER_GROUP`       | Centreon Broker group.                             | `centreon-broker`             |
| `BINARY_DIR`         | Binaries directory.                                | `/usr/bin`                    |
| `PERL_BINARY`        | Perl binary.                                       | `/usr/bin/perl`               |
| `SYSTEMD_ETC_DIR`    | Systemd configuration directory.                   | `/etc/systemd/system`         |
| `SYSCONFIG_ETC_DIR`  | Sysconfig configuration directory.                 | `/etc/sysconfig`              |
| `SUDOERSD_ETC_DIR`   | Sudoers configuration directory.                   | `/etc/sudoers.d`              |
| `LOGROTATED_ETC_DIR` | Logrotate configuration directory.                 | `/etc/logrotate.d`            |
| `TMP_DIR`            | Temporary directory where source files are built.  | `/tmp/centreon-setup`         |
| `LOG_FILE`           | Installation script log file.                      | `$BASE_DIR/log/install.log`   |

## Centreon Web

### Prerequisites

To install and run Centreon Web, you will need the following external
dependencies:

- Apache 2.4, the web server,
- MariaDB 10.5, the database management system to store the configuration
  and realtime data,
- PHP 7.3 and common PHP libraries,
- Composer, a PHP package manager (if using GitHub sources),
- npm, a JavaScript package manager (if using GitHub sources),
- Perl 5 and some Perl libraries,
- RRDTool 1.7, the database management system to store metrics and draw
  graphs.

Use the system package manager to install them:

<!--DOCUSAURUS_CODE_TABS-->

<!--CentOS 8-->

```shell
dnf install dnf-plugins-core epel-release wget
dnf config-manager --set-enabled powertools
dnf module reset php
dnf module enable php:7.3
wget https://downloads.mariadb.com/MariaDB/mariadb_repo_setup
bash mariadb_repo_setup --mariadb-server-version="mariadb-10.5"
dnf remove mariadb-connector-c
dnf install httpd MariaDB-client MariaDB-common MariaDB-shared MariaDB-server net-snmp net-snmp-libs net-snmp-perl net-snmp-utils perl perl-Crypt-DES perl-DBD-MySQL perl-DBI perl-Digest-HMAC perl-Digest-SHA1 perl-HTML-Parser perl-IO-Socket-INET6 perl-Socket6 perl-Sys-Syslog php php-zip php-xml php-fpm php-process php-common php-pdo php-intl php-json php-mysqlnd php-ldap php-gd php-cli php-mbstring php-snmp rrdtool rsync sudo mailx
```

<!--CentOS 7-->

```shell
yum install centos-release-scl wget
wget https://downloads.mariadb.com/MariaDB/mariadb_repo_setup
bash mariadb_repo_setup --mariadb-server-version="mariadb-10.5"
yum install httpd24-httpd MariaDB-client MariaDB-common MariaDB-shared MariaDB-server net-snmp net-snmp-libs net-snmp-perl net-snmp-utils perl perl-Crypt-DES perl-DBD-MySQL perl-DBI perl-Digest-HMAC perl-Digest-SHA1 perl-HTML-Parser perl-IO-Socket-INET6 perl-Socket6 perl-Sys-Syslog rh-php73 rh-php73-php-zip rh-php73-php-xml rh-php73-php-fpm rh-php73-php-process rh-php73-php-common rh-php73-php-pdo rh-php73-php-intl rh-php73-php-json rh-php73-php-mysqlnd rh-php73-php-ldap rh-php73-php-gd rh-php73-php-cli rh-php73-php-mbstring rh-php73-php-snmp rrdtool rsync sudo mailx
```

<!--Debian-->

```shell
apt install wget apt-transport-https lsb-release ca-certificates
wget https://packages.sury.org/php/apt.gpg -O /etc/apt/trusted.gpg.d/php.gpg
echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" >> /etc/apt/sources.list.d/php.list
wget https://downloads.mariadb.com/MariaDB/mariadb_repo_setup
bash mariadb_repo_setup --mariadb-server-version="mariadb-10.5"
apt update
apt install apache2 bsd-mailx libcrypt-des-perl libdigest-hmac-perl libdigest-sha-perl libgd-perl libnet-snmp-perl libsnmp-perl mariadb-client-10.5 mariadb-server-10.5 php7.3 php7.3-cli php7.3-common php7.3-curl php7.3-fpm php7.3-gd php7.3-intl php7.3-json php7.3-ldap php7.3-mbstring php7.3-mysql php7.3-opcache php7.3-readline php7.3-snmp php7.3-sqlite3 php7.3-xml php7.3-zip php-date rrdtool rsync sudo
```

<!--Ubuntu-->

```shell
add-apt-repository ppa:ondrej/php
wget https://downloads.mariadb.com/MariaDB/mariadb_repo_setup
bash mariadb_repo_setup --mariadb-server-version="mariadb-10.5" --os-type=ubuntu --os-version=focal
apt update
apt install apache2 bsd-mailx libcrypt-des-perl libdigest-hmac-perl libdigest-sha-perl libgd-perl libnet-snmp-perl libsnmp-perl mariadb-client-10.5 mariadb-server-10.5 php7.3 php7.3-cli php7.3-common php7.3-curl php7.3-fpm php7.3-gd php7.3-intl php7.3-json php7.3-ldap php7.3-mbstring php7.3-mysql php7.3-opcache php7.3-readline php7.3-snmp php7.3-sqlite3 php7.3-xml php7.3-zip php-date rrdtool rsync sudo
```

<!--openSUSE-->

```shell
zypper addrepo --priority 70 --gpgcheck --refresh https://yum.mariadb.org/10.5/sles150-amd64/ mariadb105
zypper addrepo --priority 70 --gpgcheck --refresh https://download.opensuse.org/repositories/devel:/languages:/php:/php73/openSUSE_Leap_15.2 php73
zypper --gpg-auto-import-keys refresh
zypper install httpd MariaDB-client MariaDB-common MariaDB-shared MariaDB-server net-snmp libsnmp30 perl-Net-SNMP perl perl-Crypt-DES perl-DBD-mysql perl-DBI perl-Digest-HMAC perl-Digest-SHA1 perl-HTML-Parser perl-IO-Socket-INET6 perl-Socket6 php7 php7-ctype php7-curl php7-dom php7-fpm php7-gd php7-gettext php7-iconv php7-intl php7-json php7-ldap php7-mbstring php7-mysql php7-openssl php7-pdo php7-phar php7-snmp php7-sqlite php7-tokenizer php7-xmlreader php7-xmlwriter php7-zip php7-zlib rrdtool rsync sudo
```

<!--END_DOCUSAURUS_CODE_TABS-->

### Prepare the system

#### SELinux

> For distributions with SELinux installed.

SELinux should be disabled. To do this, you have to edit the file
**/etc/selinux/config** and replace **enforcing** by **disabled**, or by
running the following command:

```shell
sed -i s/^SELINUX=.*$/SELINUX=disabled/ /etc/selinux/config
```

> Reboot your operating system to apply the change.

After system startup, perform a quick check of the SELinux status:

```shell
$ getenforce
Disabled
```

#### Firewall

Add firewall rules or disable the firewall by running the following commands:

```shell
systemctl stop firewalld
systemctl disable firewalld
```

#### MariaDB

Secure the installation of MariaDB by running the tool provided for this
purpose:

```shell
mariadb-secure-installation
```

Answer by the negative to the question `Switch to unix_socket authentication`.

Answer by the positive to the question `Change the root password?` and
define a password.

This password will be needed during the installation process.

The answer to the question `Disallow root login remotely?` will depend
on wether the database is installed on the same server as Centreon or not.

> As said by the tool, PLEASE READ EACH STEP CAREFULLY!

### Prepare the sources

#### Get the sources

Centreon Web can be checked out from the
[GitHub repository](https://github.com/centreon/centreon)
or downloaded from Centreon
[download website](https://download.centreon.com/)

<!--DOCUSAURUS_CODE_TABS-->

<!--GitHub repository-->

```shell
git clone -b x.y.z https://github.com/centreon/centreon
```

<!--Download website-->

```shell
wget http://files.download.centreon.com/public/centreon/centreon-web-x.y.z.tar.gz
tar xzf centreon-web-x.y.z.tar.gz
```

<!--END_DOCUSAURUS_CODE_TABS-->

With x.y.z being the version you want to install.

#### Composer

> Not necessary if you download the sources from Centreon website.

Install Composer:

<!--DOCUSAURUS_CODE_TABS-->

<!--CentOS 8-->

```shell
wget https://getcomposer.org/installer -O composer-setup.php
php composer-setup.php --install-dir=/usr/bin --filename=composer
```

<!--CentOS 7-->

```shell
wget https://getcomposer.org/installer -O composer-setup.php
/opt/rh/rh-php73/root/usr/bin/php composer-setup.php --install-dir=/usr/bin --filename=composer
```

<!--Debian / Ubuntu-->

```shell
wget https://getcomposer.org/installer -O composer-setup.php
php composer-setup.php --install-dir=/usr/bin --filename=composer
```

<!--openSUSE-->

```shell
wget https://getcomposer.org/installer -O composer-setup.php
php composer-setup.php --install-dir=/usr/bin --filename=composer
```

<!--END_DOCUSAURUS_CODE_TABS-->

Then install the PHP dependencies from Centreon Web source folder:

<!--DOCUSAURUS_CODE_TABS-->

<!--CentOS 8-->

```shell
cd /path_to_centreon_web
composer install --no-dev --optimize-autoloader
```

<!--CentOS 7-->

```shell
cd /path_to_centreon_web
/opt/rh/rh-php73/root/usr/bin/php /usr/bin/composer install --no-dev --optimize-autoloader
```

<!--Debian / Ubuntu-->

```shell
cd /path_to_centreon_web
composer install --no-dev --optimize-autoloader
```

<!--openSUSE-->

```shell
cd /path_to_centreon_web
composer install --no-dev --optimize-autoloader
```

<!--END_DOCUSAURUS_CODE_TABS-->

#### npm

> Not necessary if you download the sources from Centreon website.

Install Node.js:

<!--DOCUSAURUS_CODE_TABS-->

<!--CentOS 8-->

```shell
wget -qO- https://rpm.nodesource.com/setup_15.x | bash
dnf install nodejs python2
```

<!--CentOS 7-->

```shell
wget -qO- https://rpm.nodesource.com/setup_14.x | bash
yum install nodejs python2
```

<!--Debian / Ubuntu-->

```shell
wget -qO- https://deb.nodesource.com/setup_15.x | bash
apt install nodejs python2
```

<!--openSUSE-->

```shell
zypper addrepo http://download.opensuse.org/repositories/devel:/languages:/nodejs/openSUSE_Leap_15.2 nodejs
zypper refresh
zypper install nodejs15 python
```

<!--END_DOCUSAURUS_CODE_TABS-->

Then install the JavaScript dependencies from Centreon Web source
folder:

```shell
cd /path_to_centreon_web
npm ci
npm run build
rm -rf node_modules
```

### Install

Run the installation script:

```shell
cd /path_to_centreon_web
./install.sh -i
```

It should result to the following output (here on a Debian 10):

```text
Script requirements                                                  OK
Found distribution                                                   debian 10
Loading distribution specific input variables                        install/inputvars.debian.env
Loading user specific input variables                                inputvars.env
Installation type                                                    central
Installation mode                                                    install


Welcome to Centreon installation script!

Should we start? [Y/n]
> y


Centreon installation requirements
-------------------------------------------------------------------------------------------------
Checking installation requirements                                   OK


Centreon information
-------------------------------------------------------------------------------------------------
Centreon user (CENTREON_USER)                                        centreon
Centreon group (CENTREON_GROUP)                                      centreon
Centreon user home directory (CENTREON_HOME)                         /var/spool/centreon
Centreon installation directory (CENTREON_INSTALL_DIR)               /usr/share/centreon
Centreon configuration directory (CENTREON_ETC_DIR)                  /etc/centreon
Centreon log directory (CENTREON_LOG_DIR)                            /var/log/centreon
Centreon variable library directory (CENTREON_VARLIB_DIR)            /var/lib/centreon
Centreon Plugins temporary directory (CENTREON_PLUGINS_TMP_DIR)      /var/lib/centreon/centplugins
Centreon cache directory (CENTREON_CACHE_DIR)                        /var/cache/centreon
Centreontrapd spool directory (CENTREONTRAPD_SPOOL_DIR)              /var/spool/centreontrapd
Centreon Centcore directory (CENTREON_CENTCORE_DIR)                  /var/lib/centreon/centcore
Centreon RRD status directory (CENTREON_RRD_STATUS_DIR)              /var/lib/centreon/status
Centreon RRD metrics directory (CENTREON_RRD_METRICS_DIR)            /var/lib/centreon/metrics
Use HTTPS configuration (USE_HTTPS)                                  0
Install database configuration (WITH_DB)                             1

Everything looks good, proceed to installation? [y/N]
> y


Build files
-------------------------------------------------------------------------------------------------
Copying files to '/tmp/centreon-setup'                               OK
Replacing macros                                                     OK
Building installation tree                                           OK


Install builded files
-------------------------------------------------------------------------------------------------
Copying files from '/tmp/centreon-setup' to final directory          OK


Install remaining files
-------------------------------------------------------------------------------------------------
Logrotate Centreon configuration                                     OK
Logrotate Centreontrapd configuration                                OK
Symfony .env file                                                    OK
Symfony .env.local.php file                                          OK
Apache configuration                                                 OK
PHP FPM configuration                                                OK
PHP FPM service configuration                                        OK
PHP configuration                                                    OK
MariaDB configuration                                                OK
MariaDB service configuration                                        OK


Update groups memberships
-------------------------------------------------------------------------------------------------
Add user 'centreon-engine' to group 'centreon'                       OK
Add user 'centreon' to group 'centreon-engine'                       OK
Add user 'centreon-engine' to group 'centreon-broker'                OK
Add user 'centreon-broker' to group 'centreon'                       OK
Add user 'centreon' to group 'centreon-gorgone'                      OK
Add user 'centreon-gorgone' to group 'centreon'                      OK
Add user 'centreon-gorgone' to group 'centreon-broker'               OK
Add user 'centreon-gorgone' to group 'centreon-engine'               OK
Add user 'www-data' to group 'centreon'                              OK
Add user 'www-data' to group 'centreon-engine'                       OK
Add user 'www-data' to group 'centreon-broker'                       OK
Add user 'www-data' to group 'centreon-gorgone'                      OK
Add user 'centreon-gorgone' to group 'www-data'                      OK
Add user 'centreon' to group 'www-data'                              OK


Configure and restart services
-------------------------------------------------------------------------------------------------
Enabling service 'centreon'                                          OK
Enabling service 'centreontrapd'                                     OK
Reloading systemctl daemon                                           OK
Enabling Apache module 'proxy'                                       OK
Enabling Apache module 'proxy_fcgi'                                  OK
Enabling Apache module 'setenvif'                                    OK
Enabling Apache module 'headers'                                     OK
Enabling Apache module 'rewrite'                                     OK
Enabling Apache configuration '10-centreon'                          OK
Enabling service 'apache2'                                           OK
Restarting service 'apache2'                                         OK
Enabling service 'php7.3-fpm'                                        OK
Restarting service 'php7.3-fpm'                                      OK
Enabling service 'mariadb'                                           OK
Restarting service 'mariadb'                                         OK


You're done!
-------------------------------------------------------------------------------------------------
You can now connect to the following URL to finalize installation:
        http://<ip>/centreon/

Take a look at the documentation
https://docs.centreon.com/current/en/installation/web-and-post-installation.html.
Thanks for using Centreon!
Follow us on https://github.com/centreon/centreon!
```

#### Define specific inputs

Input variables can be defined by using the `inputvars.env` file which is
read by the installation script.

The option `-e` can also be used in command line.

Here is an example to install Centreon with HTTPS:

```shell
./install.sh -i \
    -e "USE_HTTPS=1" \
    -e "HTTPS_CERTIFICATE_FILE=/etc/pki/tls/certs/website.crt" \
    -e "HTTPS_CERTIFICATE_KEY_FILE=/etc/pki/tls/private/website.key"
```

Below the list of available variables, their description and default value:

| Variable                     | Description                                                                             | Default value                       |
|------------------------------|-----------------------------------------------------------------------------------------|-------------------------------------|
| `INSTALLATION_TYPE`          | Type of installation. Can be `central` or `poller`                                      | `central`                           |
| `WITH_DB`                    | Install database configuration (if MariaDB is installed locally).                       | `1`                                 |
| `USE_HTTPS`                  | Install Apache configuration to use HTTPS.                                              | `0`                                 |
| `HTTPS_CERTIFICATE_FILE`     | Path to the certificate file (if HTTPS is used).                                        | none                                |
| `HTTPS_CERTIFICATE_KEY_FILE` | Path to the certificate key file (if HTTPS is used).                                    | none                                |
| `CENTREON_USER`              | Centreon user.                                                                          | `centreon`                          |
| `CENTREON_GROUP`             | Centreon group.                                                                         | `centreon`                          |
| `CENTREON_HOME`              | Centreon user home directory.                                                           | `/var/spool/centreon`               |
| `CENTREON_INSTALL_DIR`       | Centreon installation directory.                                                        | `/usr/share/centreon`               |
| `CENTREON_ETC_DIR`           | Centreon configuration directory.                                                       | `/etc/centreon`                     |
| `CENTREON_CACHE_DIR`         | Centreon cache directory.                                                               | `/var/cache/centreon`               |
| `CENTREON_LOG_DIR`           | Centreon log directory.                                                                 | `/var/log/centreon`                 |
| `CENTREON_VARLIB_DIR`        | Centreon variable library directory.                                                    | `/var/lib/centreon`                 |
| `CENTREON_CENTCORE_DIR`      | Centreon Centcore directory.                                                            | `/var/lib/centreon/centcore`        |
| `CENTREON_RRD_STATUS_DIR`    | Centreon RRD status directory.                                                          | `/var/lib/centreon/status`          |
| `CENTREON_RRD_METRICS_DIR`   | Centreon RRD metrics directory.                                                         | `/var/lib/centreon/metrics`         |
| `CENTREON_PLUGINS_DIR`       | Centreon Plugins directory.                                                             | `/usr/lib/centreon/plugins`         |
| `CENTREON_PLUGINS_TMP_DIR`   | Centreon Plugins temporary directory.                                                   | `/var/lib/centreon/centplugins`     |
| `CENTREONTRAPD_SPOOL_DIR`    | Centreontrapd spool directory                                                           | `/var/spool/centreontrapd`          |
| `NAGIOS_INSTALL_DIR`         | Nagios Plugins directory                                                                | `/usr/local/nagios`                 |
| `ENGINE_USER`                | Centreon Engine user.                                                                   | `centreon-engine`                   |
| `ENGINE_GROUP`               | Centreon Engine group.                                                                  | `centreon-engine`                   |
| `ENGINE_BINARY`              | Centreon Engine binary.                                                                 | `/usr/sbin/centengine`              |
| `ENGINE_ETC_DIR`             | Centreon Engine configuration directory.                                                | `/etc/centreon-engine`              |
| `ENGINE_LOG_DIR`             | Centreon Engine log directory.                                                          | `/var/log/centreon-engine`          |
| `ENGINE_LIB_DIR`             | Centreon Engine library directory.                                                      | `/usr/lib/centreon-engine`          |
| `ENGINE_CONNECTORS_DIR`      | Centreon Engine Connectors directory.                                                   | `/usr/lib/centreon-connector`       |
| `BROKER_USER`                | Centreon Broker user.                                                                   | `centreon-broker`                   |
| `BROKER_GROUP`               | Centreon Broker group.                                                                  | `centreon-broker`                   |
| `BROKER_ETC_DIR`             | Centreon Broker configuration directory.                                                | `/etc/centreon-broker`              |
| `BROKER_LOG_DIR`             | Centreon Broker log directory.                                                          | `/var/log/centreon-broker`          |
| `BROKER_VARLIB_DIR`          | Centreon Broker variable library directory.                                             | `/var/lib/centreon-broker`          |
| `BROKER_MOD_BINARY`          | Centreon Broker Module binary.                                                          | `/usr/lib/centreon-broker/cbmod.so` |
| `GORGONE_USER`               | Centreon Gorgone user.                                                                  | `centreon-gorgone`                  |
| `GORGONE_GROUP`              | Centreon Gorgone group.                                                                 | `centreon-gorgone`                  |
| `GORGONE_VARLIB_DIR`         | Centreon Gorgone variable library directory.                                            | `/var/lib/centreon-gorgone`         |
| `GORGONE_ETC_DIR`            | Centreon Gorgone configuration directory.                                               | `/etc/centreon-gorgone`             |
| `GORGONE_LOG_DIR`            | Centreon Gorgone log directory.                                                         | `/var/log/centreon-gorgone`         |
| `PHP_BINARY`                 | PHP binary.                                                                             | auto detection                      |
| `PHP_ETC_DIR`                | PHP configuration directory.                                                            | auto detection                      |
| `PHPFPM_CONF_DIR`            | PHP FPM configuration directory.                                                        | auto detection                      |
| `PHPFPM_VARLIB_DIR`          | PHP FPM variable library directory.                                                     | `/var/lib/php`                      |
| `PHPFPM_LOG_DIR`             | PHP FPM log directory.                                                                  | `/var/log/php-fpm`                  |
| `PHPFPM_SERVICE`             | PHP FPM systemd service name.                                                           | auto detection                      |
| `PHPFPM_SERVICE_DIR`         | PHP FPM systemd drop-in directory (built from `SYSTEMD_ETC_DIR` and `PHPFPM_SERVICE`).  | auto detection                      |
| `PHP_TIMEZONE`               | PHP timezone.                                                                           | auto detection                      |
| `APACHE_SERVICE`             | Apache systemd service name.                                                            | auto detection                      |
| `APACHE_USER`                | Apache user.                                                                            | auto detection                      |
| `APACHE_GROUP`               | Apache group.                                                                           | auto detection                      |
| `APACHE_DIR`                 | Apache directory.                                                                       | auto detection                      |
| `APACHE_CONF_DIR`            | Apache configuration directory.                                                         | auto detection                      |
| `MARIADB_CONF_DIR`           | MariaDB configuration directory.                                                        | auto detection                      |
| `MARIADB_SERVICE`            | MariaDB systemd service name.                                                           | auto detection                      |
| `MARIADB_SERVICE_DIR`        | MariaDB systemd drop-in directory (built from `SYSTEMD_ETC_DIR` and `MARIADB_SERVICE`). | auto detection                      |
| `MARIADB_SOCKET`             | MariaDB socket file.                                                                    | auto detection                      |
| `RRDTOOL_BINARY`             | RRDTool binary.                                                                         | `/usr/bin/rrdtool`                  |
| `MAIL_BINARY`                | Mail binary.                                                                            | `/usr/bin/mail`                     |
| `PERL_BINARY`                | Perl binary.                                                                            | `/usr/bin/perl`                     |
| `SYSTEMD_ETC_DIR`            | Systemd configuration directory.                                                        | `/etc/systemd/system`               |
| `SYSCONFIG_ETC_DIR`          | Sysconfig configuration directory.                                                      | `/etc/sysconfig`                    |
| `SUDOERSD_ETC_DIR`           | Sudoers configuration directory.                                                        | `/etc/sudoers.d`                    |
| `SNMP_ETC_DIR`               | SNMP configuration directory.                                                           | `/etc/snmp`                         |
| `CROND_ETC_DIR`              | Cron configuration directory.                                                           | `/etc/cron.d`                       |
| `LOGROTATED_ETC_DIR`         | Logrotate configuration directory.                                                      | `/etc/logrotate.d`                  |
| `TMP_DIR`                    | Temporary directory where source files are built.                                       | `/tmp/centreon-setup`               |
| `LOG_FILE`                   | Installation script log file.                                                           | `$BASE_DIR/log/install.log`         |

#### Troubleshooting

You may encounter errors when requirements are checked, which don't
necessarily mean that the provided inputs are wrong, but often mean that
the system does not have all needed directories or files.

Here is an example with both MariaDB and PHP FPM systemd's drop-in
directories, which are auto determined by concatenating `SYSTEMD_ETC_DIR`
and the found `MARIADB_SERVICE` and `PHPFPM_SERVICE`.

```text
Centreon installation requirements
-------------------------------------------------------------------------------------------------
Checking installation requirements                                   FAILED

Errors:
  Cannot find directory '/lib/systemd/system/mariadb.service.d' from variable 'MARIADB_SERVICE_DIR' (MariaDB systemd directory)
  Cannot find directory '/lib/systemd/system/php7.3-fpm.service.d' from variable 'PHPFPM_SERVICE_DIR' (PHP FPM service directory)
```

You can then either change one of the previously mentioned inputs, or
directly the ones mentioned in the errors strings.

To do so, edit the `inputvars.env` file.

### Finalize installation through web UI

Conclude installation by performing
[web installation steps](../web-and-post-installation.html#web-installation).
