# SearchX

Let's you search for user information based on criteria such as the user's name, age, email and address.
The user can then sort the results based on same criteria mentioned above.

## Setup locally

> **Note**: Ensure you have done the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) before proceeding.

Clone the project onto your local machine and cd into it.

Run the following command from the _root_ of the project:

```bash
# OR using Yarn
yarn start

# using npm
npm start
```

## Start the application

Open a _new_ terminal from the _root_ of the project. Run the following command to start the app on _Android_ or _iOS_:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

## Searching

Once the app is initialized, you'll be presented with a search screen from where you can search user records. You can search based on the following criteria: name, age, address and email. The default criteria is "name".

1. Type a text into the search box and hit enter.
2. Tap on any one of the user records displayed to view details.
3. You can tap on the filter button next to the search box to select a search criteria.
4. The records will automatically be searched with the text you provided in step 1.
5. You can use the paginator to view other records in the search results not currently displayed
6. If your search returned nothing, an empty screen will be shown.

## Sorting

Once your search has returned results, you can sort the results in ascending order using these criteria: name, age, address and email.

1. Tap on the sort filter adjacent to the 'Search Results' title
2. Select a sort criteria
3. Your search results are sorted by your selected sort criteria

### Now what?

Congratulations! Your tour of the SearchX app is now complete. You can keep searching with different strings and sort your results.
