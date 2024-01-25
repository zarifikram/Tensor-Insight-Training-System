from storages.backends.azure_storage import AzureStorage
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

class CustomAzureStorageStatic(AzureStorage):
    account_name = os.getenv('AZURE_STORAGE_ACCOUNT')
    account_key = os.getenv('AZURE_STORAGE_ACCOUNT_KEY')
    azure_container = 'static'
    expiration_secs = None

class CustomAzureStorageMedia(AzureStorage):
    account_name = os.getenv('AZURE_STORAGE_ACCOUNT')
    account_key = os.getenv('AZURE_STORAGE_ACCOUNT_KEY')
    azure_container = 'media'
    expiration_secs = None