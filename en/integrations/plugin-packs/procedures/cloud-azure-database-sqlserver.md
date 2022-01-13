---
id: cloud-azure-database-sqlserver
title: Azure SQL Server
---

## Pack Assets

### Templates

The Centreon Plugin Pack Azure SQL Server brings 1 host template:
* Cloud-Azure-Database-SqlServer-custom

It brings the following Service Template:

| Service Alias | Service Template                          | Service Description     | Default |
|:--------------|:------------------------------------------|:------------------------|:--------|
| Health        | Cloud-Azure-Database-SqlServer-Health-Api | Check SQL server state. | X       |

### Discovery rules

The Centreon Plugin-Pack *Azure SQL Server* includes a Host Discovery provider to
automatically discover the Azure instances of a given subscription and add them
to the Centreon configuration. This provider is named **Microsoft Azure SQL Server**:

![image](../../../assets/integrations/plugin-packs/procedures/cloud-azure-database-sqlserver-provider.png)
> This discovery feature is only compatible with the 'api' custom mode. 'azcli' is not supported.

More information about the Host Discovery module is available in the Centreon documentation:[Host Discovery](../../../monitoring/discovery/hosts-discovery.html)

### Collected metrics & status

<!--DOCUSAURUS_CODE_TABS-->

<!--Health-->

<!--END_DOCUSAURUS_CODE_TABS-->

## Prerequisites

To get data from Azure Services, the following methods are available:
	* Azure API ('api')
	* Azure CLI ('azcli')

Centreon recommends to use the API instead of the CLI for the following reasons:
	* the API is much more efficient because it avoids CLI binary execution
	* the API supports application authentication while CLI does not (yet)

<!--DOCUSAURUS_CODE_TABS-->

<!--Azure Monitor API-->

To use the 'api' custom mode, make sure to obtain the required information using the 
how-to below. Keep it safe until including it in a Host or Host Template definition.

* Create an *application* in Azure Active Directory:
	- Log in to your Azure account.
	- Select *Azure Active directory* in the left sidebar.
	- Click on *App registrations*.
	- Click on *+ Add*.
	- Enter Centreon as the application name (or any name of your choice), select application type (api) and sign-on-url.
	- Click on the *Create* button.

* Get *Subscription ID*
	- Log in to your Azure account.
	- Select *Subscriptions* in the left sidebar.
	- Select whichever subscription is needed.
	- Click on *Overview*.
	- Copy the Subscription ID.

* Get *Tenant ID*
	- Log in to your Azure account.
	- Select *Azure Active directory* in the left sidebar.
	- Click on *Properties*.
	- Copy the directory ID.

* Get *Client ID*
	- Log in to your Azure account.
	- Select *Azure Active directory* in the left sidebar.
	- Click on *Enterprise applications*.
	- Click on *All applications*.
	- Select the application previously created.
	- Click on *Properties*.
	- Copy the Application ID.

* Get *Client secret*
	- Log in to your Azure account.
	- Select *Azure Active directory* in the left sidebar.
	- Click on *App registrations*.
	- Select the application previously created.
	- Click on *All settings*.
	- Click on *Keys*.
	- Enter the key description and select the duration.
	- Click on *Save*.
	- Copy and store the key value. **You won't be able to retrieve it after you leave this page**.

Please make sure to assign the **Monitoring Reader** role to the application.

<!--Azure AZ CLI-->

To use the 'azcli' custom mode, install the required packages on every Centreon poller expected to 
monitor Azure Resources using CLI:

- The CLI needs at least Python version 2.7
(<https://github.com/Azure/azure-cli/blob/dev/doc/install_linux_prerequisites.md>).

On RPM-Based distributions, use the command below to install it using *root* or 'sudo':

```shell
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo echo -e "[azure-cli]\nname=Azure CLI\nbaseurl=https://packages.microsoft.com/yumrepos/azure-cli\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/azure-cli.repo
sudo yum install https://packages.microsoft.com/yumrepos/azure-cli/azure-cli-2.29.2-1.el7.x86_64.rpm
```

Then, use the **centreon-engine** account to obtain a token using the command below:

```shell
su - centreon-engine
az login
```

The shell will output this message including an authentication code:

	*To sign in, use a web browser to open the page https://microsoft.com/devicelogin*
	*and enter the code CWT4WQZAD to authenticate.*

Go to <https://microsoft.com/devicelogin> and enter the code.

Connect using a monitoring service account. As a result, the shell should prompt
the information below:

```shell
	[
	  {
		"cloudName": "AzureCloud",
		"id": "0ef83f3a-d83e-2039-d930-309df93acd93d",
		"isDefault": true,
		"name": "N/A(tenant level account)",
		"state": "Enabled",
		"tenantId": "0ef83f3a-03cd-2039-d930-90fd39ecd048",
		"user": {
		  "name": "email@mycompany.onmicrosoft.com",
		  "type": "user"
		}
	  }
	]
```

Credentials are now stored locally in the **accessTokens.json** file so the Plugin
can use it.

<!--END_DOCUSAURUS_CODE_TABS-->

## Setup

<!--DOCUSAURUS_CODE_TABS-->

<!--Online License-->

1. Install the Centreon Plugin package on every Centreon poller expected to monitor *Azure SQL Server* resources:

```bash
yum install centreon-plugin-Cloud-Azure-Database-SqlServer-Api
```

2. On the Centreon Web interface, install the **Azure SQL Server** Centreon Plugin Pack on the **Configuration > Plugin Packs** page.

<!--Offline License-->

1. Install the Centreon Plugin package on every Centreon poller expected to monitor *Azure SQL Server* resources:

```bash
yum install centreon-plugin-Cloud-Azure-Database-SqlServer-Api
```

2. Install the **Azure SQL Server** Centreon Plugin Pack RPM on the Centreon Central server:

 ```bash
yum install centreon-pack-cloud-azure-database-sqlserver
```

3. On the Centreon Web interface, install the **Azure SQL Server** Centreon Plugin Pack on the **Configuration > Plugin Packs** page.

<!--END_DOCUSAURUS_CODE_TABS-->

## Configuration

### Host

* Log into Centreon and add a new Host through **Configuration > Hosts**.
* In the *IP *Address/FQDN** field, set the following IP address: '127.0.0.1'.
* Select the **Cloud-Azure-Database-SqlServer-custom** template to apply to the Host.
* Once the template is applied, fill in the corresponding macros. Some macros are mandatory.
These mandatory Macros differ depending the custom mode used.

> Two methods can be used to set the Macros:
> * full ID of the Resource (`/subscriptions/<subscription_id>/resourceGroups/<resourcegroup_id>/providers/XXXXX/XXXXX/<resource_name>`)
in *AZURERESOURCE*
> * Resource Name in *AZURERESOURCE* associated with Resource Group (in *AZURERESOURCEGROUP*)

<!--DOCUSAURUS_CODE_TABS-->

<!--Azure Monitor API-->

| Mandatory   | Macro              | Description                                        |
|:------------|:-------------------|:---------------------------------------------------|
|             | AZURECLIENTID      | Client ID                                          |
|             | AZURECLIENTSECRET  | Client secret                                      |
|             | AZURECUSTOMMODE    | Custom mode 'api'                                  |
|             | AZURERESOURCE      | ID or name of the %s resource                      |
|             | AZURERESOURCEGROUP | Associated Resource Group if resource name is used |
|             | AZURESUBSCRIPTION  | Subscription ID                                    |
|             | AZURETENANT        | Tenant ID                                          |

<!--Azure AZ CLI-->

| Mandatory   | Macro              | Description                                        |
|:------------|:-------------------|:---------------------------------------------------|
|             | AZURECUSTOMMODE    | Custom mode 'api'                                  |
|             | AZURERESOURCE      | ID or name of the %s resource                      |
|             | AZURERESOURCEGROUP | Associated Resource Group if resource name is used |
|             | AZURESUBSCRIPTION  | Subscription ID                                    |

<!--END_DOCUSAURUS_CODE_TABS-->

## How to check in the CLI that the configuration is OK and what are the main options for? 

Once the plugin is installed, log into your Centreon Poller CLI using the 
**centreon-engine** user account (`su - centreon-engine`) and test the Plugin by running the following 
command:

```bash
/usr/lib/centreon/plugins//centreon_azure_database_sqlserver_api.pl \
    --plugin=cloud::azure::database::sqlserver::plugin \
    --mode=health \
    --custommode='api' \
    --resource='' \
    --resource-group='' \
    --subscription='' \
    --tenant='' \
    --client-id='' \
    --client-secret='' \
    --proxyurl='' \
    --ok-status='' \
    --warning-status='' \
    --critical-status='' \
    --unknown-status='' \
    --use-new-perfdata 
```

The expected command output is shown below:

```bash
OK: | 
```

This command would trigger a WARNING alarm if *WHAT* is reported as over 
(`--warning-vault-availability-percentage`) and a CRITICAL alarm if less
than 50% (`--critical-vault-availability-percentage='50:'`).

All available options for a given mode can be displayed by adding the 
`--help` parameter to the command:

```bash
/usr/lib/centreon/plugins//centreon_azure_database_sqlserver_api.pl \
    --plugin=cloud::azure::database::sqlserver::plugin \
    --mode=health \
    --help
```

All available options for a given mode can be displayed by adding the 
`--list-mode` parameter to the command:

```bash
/usr/lib/centreon/plugins//centreon_azure_database_sqlserver_api.pl \
    --plugin=cloud::azure::database::sqlserver::plugin \
    --list-mode
```

### Troubleshooting

Please find all the troubleshooting documentation for the API-based Plugins in
the [dedicated chapter](../tutorials/troubleshooting-plugins.html#http-and-api-checks)
of the Centreon documentation.