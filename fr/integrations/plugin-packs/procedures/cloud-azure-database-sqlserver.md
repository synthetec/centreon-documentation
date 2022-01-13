---
id: cloud-azure-database-sqlserver
title: Azure SQL Server
---

## Contenu du Pack

### Modèles

Le Plugin Pack Centreon Azure SQL Server apporte 1 modèle d'hôte :
* Cloud-Azure-Database-SqlServer-custom

Il apporte le Modèle de Service suivant :

| Alias         | Modèle de service                         | Description             | Défaut  |
|:--------------|:------------------------------------------|:------------------------|:--------|
| Health        | Cloud-Azure-Database-SqlServer-Health-Api | Check SQL server state. | X       |

### Règles de découverte

Le Plugin-Pack Centreon *Azure SQL Server* inclut un fournisseur de découverte
d'Hôtes nommé **Microsoft Azure SQL Servers**. Celui-ci permet de découvrir l'ensemble des instances
rattachées à une *souscription* Microsoft Azure donnée:

![image](../../../assets/integrations/plugin-packs/procedures/cloud-azure-database-sqlserver-provider.png)

> La découverte *Azure SQL Server* n'est compatible qu'avec le mode 'api'. Le mode 'azcli' n'est pas supporté dans le cadre
> de cette utilisation.

Vous trouverez plus d'informations sur la découverte d'Hôtes et son
fonctionnement sur la documentation du module:
[Découverte des hôtes](../../../monitoring/discovery/hosts-discovery.html)

### Métriques & statuts collectés

<!--DOCUSAURUS_CODE_TABS-->

<!--Health-->

<!--END_DOCUSAURUS_CODE_TABS-->

## Prérequis

Deux moyens sont disponibles pour interroger les API Microsoft Azure.

Centreon préconise l'utilisation de la méthode *API* plutôt que la *CLI*, cette dernière étant significativement
moins performante. L'API permet également une authentification *Application* et ne nécessite pas de compte de service dédié.

<!--DOCUSAURUS_CODE_TABS-->

<!--Azure Monitor API-->

Pour le custom-mode 'api', récupérez les informations en suivant la procédure ci-dessous (en anglais)
et notez celles-ci en lieu sûr. Elles seront en effet indispensables lors de la configuration des ressources
dans Centreon.

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

Afin d'utiliser le custom-mode 'azcli', installez le binaire associé sur tous les Collecteurs Centreon
devant superviser des resources Azure :

- La CLI requiert une version de Python >= 2.7 (<https://github.com/Azure/azure-cli/blob/dev/doc/install_linux_prerequisites.md>)

Sur un système utilisant le packaging RPM, utilisez les commandes ci-dessous avec
l'utilisateur **root** ou un utilisateur avec les droits **sudo** adéquats :

```shell
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo echo -e "[azure-cli]\nname=Azure CLI\nbaseurl=https://packages.microsoft.com/yumrepos/azure-cli\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/azure-cli.repo
sudo yum install https://packages.microsoft.com/yumrepos/azure-cli/azure-cli-2.29.2-1.el7.x86_64.rpm
```

Ensuite, réalisez les opérations suivantes avec l'utilisateur **centreon-engine**
afin de récupérer le token d'authentification Azure :

```shell
su - centreon-engine
az login
```

La commande retourne le message ci-dessous contenant un code :

	*To sign in, use a web browser to open the page https://microsoft.com/devicelogin*
	*and enter the code CWT4WQZAD to authenticate.*

Rendez-vous sur <https://microsoft.com/devicelogin> afin de saisir le code obtenu, puis connectez-vous avec le compte de service dédié à la supervision.

Une fois ces actions effectuées, des informations d'auhtentification de la forme suivante devraient s'afficher dans le terminal
du collecteur Centreon: 

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

Vous avez désormais les informations stockées localement dans un fichier
**accessTokens.json** qui sera utilisé automatiquement par le Plugin.

<!--END_DOCUSAURUS_CODE_TABS-->

## Installation

<!--DOCUSAURUS_CODE_TABS-->

<!--Online License-->

1. Installer le Plugin Centreon sur tous les collecteurs Centreon devant superviser des ressources *Azure SQL Server* :

```bash
yum install centreon-plugin-Cloud-Azure-Database-SqlServer-Api
```

2. Sur l'interface Web de Centreon, installer le Plugin Pack **Azure SQL Server** depuis la page **Configuration > Packs de plugins**.

<!--Offline License-->

1. Installer le Plugin Centreon sur tous les collecteurs Centreon devant superviser des ressources *Azure SQL Server* :

```bash
yum install centreon-plugin-Cloud-Azure-Database-SqlServer-Api
```

2. Sur le serveur Central Centreon, installer le RPM du Pack **Azure SQL Server** :

 ```bash
yum install centreon-pack-cloud-azure-database-sqlserver
```

3. Sur l'interface Web de Centreon, installer le Plugin Pack **Azure SQL Server** depuis la page **Configuration > Packs de plugins**.

<!--END_DOCUSAURUS_CODE_TABS-->

## Configuration

### Hôte

* Ajoutez un Hôte à Centreon, remplissez le champ **Adresse IP/DNS** avec l'adresse 127.0.0.1.
et appliquez-lui le Modèle d'Hôte *Cloud-Azure-Database-SqlServer-custom**.
* Une fois le modèle appliqué, renseignez les Macroscorrespondantes. Attention, certaines macros sont obligatoires.
doivent être renseignées selon le *custom mode* utilisé.

> Deux méthodes peuvent être utilisées lors de l'assignation des Macros :
> * Utilisation de l'ID complet de la ressource (de type `/subscriptions/<subscription_id>/resourceGroups/<resourcegroup_id>/providers/XXXXXX/XXXXXXX/<resource_name>`)
dans la Macro *AZURERESOURCE*.
> * Utilisation du nom de la ressource dans la Macro *AZURERESOURCE* associée à la Macro *AZURERESOURCEGROUP*.

<!--DOCUSAURUS_CODE_TABS-->

<!--Azure Monitor API-->

| Obligatoire | Macro              | Description                                        |
|:------------|:-------------------|:---------------------------------------------------|
|             | AZURECLIENTID      | Client ID                                          |
|             | AZURECLIENTSECRET  | Client secret                                      |
|             | AZURECUSTOMMODE    | Custom mode 'api'                                  |
|             | AZURERESOURCE      | ID or name of the %s resource                      |
|             | AZURERESOURCEGROUP | Associated Resource Group if resource name is used |
|             | AZURESUBSCRIPTION  | Subscription ID                                    |
|             | AZURETENANT        | Tenant ID                                          |

<!--Azure AZ CLI-->

| Obligatoire | Macro              | Description                                        |
|:------------|:-------------------|:---------------------------------------------------|
|             | AZURECUSTOMMODE    | Custom mode 'api'                                  |
|             | AZURERESOURCE      | ID or name of the %s resource                      |
|             | AZURERESOURCEGROUP | Associated Resource Group if resource name is used |
|             | AZURESUBSCRIPTION  | Subscription ID                                    |

<!--END_DOCUSAURUS_CODE_TABS-->

## Comment puis-je tester le Plugin et que signifient les options des commandes ? 

Une fois le Plugin installé, vous pouvez tester celui-ci directement en ligne 
de commande depuis votre collecteur Centreon en vous connectant avec 
l'utilisateur **centreon-engine** (`su - centreon-engine`) :

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

La commande devrait retourner un message de sortie similaire à :

```bash
OK: | 
```

Dans cet exemple, une alarme de type WARNING sera déclenchée si le temps de 
réponse de l'identification est supérieure à 2 secondes 
(`--warning-time='2'`); l'alarme sera de type CRITICAL au-delà de 3 secondes
ou si le status de l'identification est différent de XXX.

La liste de toutes les options complémentaires et leur signification peut être
affichée en ajoutant le paramètre `--help` à la commande :

```bash
/usr/lib/centreon/plugins//centreon_azure_database_sqlserver_api.pl \
    --plugin=cloud::azure::database::sqlserver::plugin \
    --mode=health \
    --help
 ```

Tous les modes disponibles peuvent être affichés en ajoutant le paramètre 
`--list-mode` à la commande :

```bash
/usr/lib/centreon/plugins//centreon_azure_database_sqlserver_api.pl \
    --plugin=cloud::azure::database::sqlserver::plugin \
    --list-mode
 ```

### Diagnostic des erreurs communes

Rendez-vous sur la [documentation dédiée](../tutorials/troubleshooting-plugins.html#http-and-api-checks)
des Plugins basés sur HTTP/API.