# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Clone the project

## Step 2: Install dependencies  
In a new terminal window/pane from the root. 
```sh
 npm install
```
## Step 3: Add environment variables
create an `.env` file in the **root** of the project and add:

 ```sh
 MOVIE_DB_API_KEY=7d67c57be9ca6062a30eeea210a53c97
```
## Step 4: Run the App
open a new terminal window/pane from the root and use one of the following commands to run it on Android or iOS.

### Android

```sh
 npm run android 
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
 npm run ios
```
