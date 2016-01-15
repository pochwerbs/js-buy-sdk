import { module, test } from 'qunit';
import CollectionSerializer from 'buy-button-sdk/serializers/collection-serializer';

let serializer;

module('Unit | CollectionSerializer', {
  setup() {
    serializer = new CollectionSerializer();
  },
  teardown() {
    serializer = null;
  }
});

const singleCollectionFixture = {
  collection_publications: [
    {
      id: 220591297,
      collection_id: 159064961,
      channel_id: 40889985,
      created_at: '2016-01-05T11:32:26-05:00',
      updated_at: '2016-01-05T11:32:26-05:00',
      body_html: '',
      handle: 'blergh',
      image: null,
      title: 'Blergh.',
      published_at: '2016-01-05T11:32:26-05:00',
      published: true
    }
  ]
};

const multipleCollectionsFixture = {
  collection_publications: [
    singleCollectionFixture.collection_publications[0],
    {
      id: 220591233,
      collection_id: 157327425,
      channel_id: 40889985,
      created_at: '2016-01-05T11:32:26-05:00',
      updated_at: '2016-01-05T11:32:26-05:00',
      body_html: null,
      handle: 'frontpage',
      image: null,
      title: 'Home page',
      published_at: '2016-01-05T11:32:26-05:00',
      published: true
    }
  ]
};


// You're duplicating product stuff into collection stuff

test('it transforms a single item payload into a collection object.', function (assert) {
  assert.expect(2);

  const model = serializer.serializeSingle(singleCollectionFixture);

  assert.notOk(Array.isArray(model), 'should not be an array');
  assert.deepEqual(model.attrs, singleCollectionFixture.collection_publications[0]);
});

test('it transforms a collection payload into a list of collection objects.', function (assert) {
  assert.expect(4);

  const models = serializer.serializeCollection(multipleCollectionsFixture);

  assert.ok(Array.isArray(models), 'should be an array');
  assert.equal(models.length, 2, 'we passed in two, it should serialize two');
  assert.deepEqual(models[0].attrs, multipleCollectionsFixture.collection_publications[0]);
  assert.deepEqual(models[1].attrs, multipleCollectionsFixture.collection_publications[1]);
});

test('it attaches a reference to the serializer on the model', function (assert) {
  assert.expect(1);

  const model = serializer.serializeSingle(singleCollectionFixture);

  assert.deepEqual(model.serializer, serializer);
});

test('it attaches a reference of the passed dataStore to the model on #serializeSingle', function (assert) {
  assert.expect(1);

  const dataStore = 'some-data-store';

  const model = serializer.serializeSingle(singleCollectionFixture, dataStore);

  assert.equal(model.dataStore, dataStore);
});

test('it attaches a reference of the passed dataStore to every model on #serializeCollection', function (assert) {
  assert.expect(2);

  const dataStore = 'some-data-store';

  const models = serializer.serializeCollection(multipleCollectionsFixture, dataStore);

  assert.deepEqual(models[0].dataStore, dataStore);
  assert.deepEqual(models[1].dataStore, dataStore);
});
