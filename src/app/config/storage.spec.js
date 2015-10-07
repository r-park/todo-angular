'use strict';

describe('Storage config', function() {
  var storageConfig = require('./storage');

  it('should define a key for localStorage', function(){
    expect(storageConfig.LOCAL_STORAGE_KEY).toBe('TODO-APP');
  });

  it('should define a storage strategy', function(){
    var regex = /^(LocalStorageStrategy|ServerStorageStrategy)$/;
    expect(regex.test(storageConfig.STORAGE_STRATEGY)).toBe(true);
  });

  it('should define a base URL for the server', function(){
    expect(storageConfig.BASE_URL).toBe('http://localhost:8000');
  });

  it('should define a URL for `tasks` resource', function(){
    expect(storageConfig.TASKS_URL).toBe('http://localhost:8000/tasks');
  });
});
