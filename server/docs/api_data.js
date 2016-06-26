define({ "api": [
  {
    "group": "Campspot",
    "type": "post",
    "url": "/api/camp/search",
    "title": "Search Campgrounds",
    "name": "search",
    "description": "<p>Search for open campgrounds given a campsite and reservation file. You can post to the API by performing a simple curl request. See below:</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -v -H \"Content-Type: application/json\" -XPOST --data \"@testcase.json\" http://localhost:3030/api/camp/search",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "content",
            "description": "<p>File Content to test the end point. Copy and Paste these below in the Rest Area.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request From E-Mail:",
          "content": "{\"search\":{\"startDate\":\"2016-06-07\",\"endDate\":\"2016-06-10\"},\"gapRules\":[{\"gapSize\":2},{\"gapSize\":3}],\"campsites\":[{\"id\":1,\"name\":\"Grizzly Adams Adventure Cabin\"},{\"id\":2,\"name\":\"Lewis and Clark Camp Spot\"},{\"id\":3,\"name\":\"Jonny Appleseed Log Cabin\"},{\"id\":4,\"name\":\"Davey Crockett Camphouse\"},{\"id\":5,\"name\":\"Daniel Boone Bungalow\"},{\"id\":6,\"name\":\"Teddy Rosevelt Tent Site\"},{\"id\":7,\"name\":\"Edmund Hillary Igloo\"},{\"id\":8,\"name\":\"Bear Grylls Cozy Cave\"},{\"id\":9,\"name\":\"Wyatt Earp Corral\"}],\"reservations\":[{\"campsiteId\":1,\"startDate\":\"2016-06-01\",\"endDate\":\"2016-06-04\"},{\"campsiteId\":1,\"startDate\":\"2016-06-11\",\"endDate\":\"2016-06-13\"},{\"campsiteId\":2,\"startDate\":\"2016-06-08\",\"endDate\":\"2016-06-09\"},{\"campsiteId\":3,\"startDate\":\"2016-06-04\",\"endDate\":\"2016-06-06\"},{\"campsiteId\":3,\"startDate\":\"2016-06-14\",\"endDate\":\"2016-06-16\"},{\"campsiteId\":4,\"startDate\":\"2016-06-03\",\"endDate\":\"2016-06-05\"},{\"campsiteId\":4,\"startDate\":\"2016-06-13\",\"endDate\":\"2016-06-14\"},{\"campsiteId\":5,\"startDate\":\"2016-06-03\",\"endDate\":\"2016-06-06\"},{\"campsiteId\":5,\"startDate\":\"2016-06-12\",\"endDate\":\"2016-06-14\"},{\"campsiteId\":6,\"startDate\":\"2016-06-04\",\"endDate\":\"2016-06-06\"},{\"campsiteId\":6,\"startDate\":\"2016-06-11\",\"endDate\":\"2016-06-12\"},{\"campsiteId\":6,\"startDate\":\"2016-06-16\",\"endDate\":\"2016-06-16\"},{\"campsiteId\":7,\"startDate\":\"2016-06-03\",\"endDate\":\"2016-06-04\"},{\"campsiteId\":7,\"startDate\":\"2016-06-07\",\"endDate\":\"2016-06-09\"},{\"campsiteId\":7,\"startDate\":\"2016-06-13\",\"endDate\":\"2016-06-16\"},{\"campsiteId\":8,\"startDate\":\"2016-06-01\",\"endDate\":\"2016-06-02\"},{\"campsiteId\":8,\"startDate\":\"2016-06-05\",\"endDate\":\"2016-06-06\"},{\"campsiteId\":9,\"startDate\":\"2016-06-03\",\"endDate\":\"2016-06-05\"},{\"campsiteId\":9,\"startDate\":\"2016-06-12\",\"endDate\":\"2016-06-16\"}]}",
          "type": "json"
        },
        {
          "title": "Request With No Opening:",
          "content": "{\"search\":{\"startDate\":\"2016-06-07\",\"endDate\":\"2016-06-10\"},\"gapRules\":[{\"gapSize\":2},{\"gapSize\":3}],\"campsites\":[{\"id\":1,\"name\":\"Grizzly Adams Adventure Cabin\"},{\"id\":2,\"name\":\"Lewis and Clark Camp Spot\"},{\"id\":3,\"name\":\"Jonny Appleseed Log Cabin\"},{\"id\":4,\"name\":\"Davey Crockett Camphouse\"},{\"id\":5,\"name\":\"Daniel Boone Bungalow\"},{\"id\":6,\"name\":\"Teddy Rosevelt Tent Site\"},{\"id\":7,\"name\":\"Edmund Hillary Igloo\"},{\"id\":8,\"name\":\"Bear Grylls Cozy Cave\"},{\"id\":9,\"name\":\"Wyatt Earp Corral\"}],\"reservations\":[{\"campsiteId\":1,\"startDate\":\"2016-06-01\",\"endDate\":\"2016-06-08\"},{\"campsiteId\":1,\"startDate\":\"2016-06-11\",\"endDate\":\"2016-06-13\"},{\"campsiteId\":2,\"startDate\":\"2016-06-08\",\"endDate\":\"2016-06-09\"},{\"campsiteId\":3,\"startDate\":\"2016-06-04\",\"endDate\":\"2016-06-06\"},{\"campsiteId\":3,\"startDate\":\"2016-06-09\",\"endDate\":\"2016-06-16\"},{\"campsiteId\":4,\"startDate\":\"2016-06-03\",\"endDate\":\"2016-06-08\"},{\"campsiteId\":4,\"startDate\":\"2016-06-13\",\"endDate\":\"2016-06-14\"},{\"campsiteId\":5,\"startDate\":\"2016-06-03\",\"endDate\":\"2016-06-08\"},{\"campsiteId\":5,\"startDate\":\"2016-06-12\",\"endDate\":\"2016-06-14\"},{\"campsiteId\":6,\"startDate\":\"2016-06-04\",\"endDate\":\"2016-06-06\"},{\"campsiteId\":6,\"startDate\":\"2016-06-09\",\"endDate\":\"2016-06-12\"},{\"campsiteId\":6,\"startDate\":\"2016-06-16\",\"endDate\":\"2016-06-16\"},{\"campsiteId\":7,\"startDate\":\"2016-06-03\",\"endDate\":\"2016-06-04\"},{\"campsiteId\":7,\"startDate\":\"2016-06-07\",\"endDate\":\"2016-06-09\"},{\"campsiteId\":7,\"startDate\":\"2016-06-13\",\"endDate\":\"2016-06-16\"},{\"campsiteId\":8,\"startDate\":\"2016-06-01\",\"endDate\":\"2016-06-02\"},{\"campsiteId\":8,\"startDate\":\"2016-06-05\",\"endDate\":\"2016-06-09\"},{\"campsiteId\":9,\"startDate\":\"2016-06-03\",\"endDate\":\"2016-06-06\"},{\"campsiteId\":9,\"startDate\":\"2016-06-09\",\"endDate\":\"2016-06-16\"}]}",
          "type": "json"
        },
        {
          "title": "Partially Available Request:",
          "content": "{\"search\":{\"startDate\":\"2016-06-07\",\"endDate\":\"2016-06-10\"},\"gapRules\":[{\"gapSize\":2},{\"gapSize\":3}],\"campsites\":[{\"id\":1,\"name\":\"Grizzly Adams Adventure Cabin\"},{\"id\":2,\"name\":\"Lewis and Clark Camp Spot\"},{\"id\":3,\"name\":\"Jonny Appleseed Log Cabin\"},{\"id\":4,\"name\":\"Davey Crockett Camphouse\"},{\"id\":5,\"name\":\"Daniel Boone Bungalow\"},{\"id\":6,\"name\":\"Teddy Rosevelt Tent Site\"},{\"id\":7,\"name\":\"Edmund Hillary Igloo\"},{\"id\":8,\"name\":\"Bear Grylls Cozy Cave\"},{\"id\":9,\"name\":\"Wyatt Earp Corral\"}],\"reservations\":[{\"campsiteId\":1,\"startDate\":\"2016-06-01\",\"endDate\":\"2016-06-04\"},{\"campsiteId\":1,\"startDate\":\"2016-06-11\",\"endDate\":\"2016-06-13\"},{\"campsiteId\":2,\"startDate\":\"2016-06-08\",\"endDate\":\"2016-06-09\"},{\"campsiteId\":3,\"startDate\":\"2016-06-04\",\"endDate\":\"2016-06-06\"},{\"campsiteId\":3,\"startDate\":\"2016-06-14\",\"endDate\":\"2016-06-16\"},{\"campsiteId\":4,\"startDate\":\"2016-06-03\",\"endDate\":\"2016-06-05\"},{\"campsiteId\":4,\"startDate\":\"2016-06-13\",\"endDate\":\"2016-06-14\"},{\"campsiteId\":5,\"startDate\":\"2016-06-03\",\"endDate\":\"2016-06-08\"},{\"campsiteId\":5,\"startDate\":\"2016-06-12\",\"endDate\":\"2016-06-14\"},{\"campsiteId\":6,\"startDate\":\"2016-06-04\",\"endDate\":\"2016-06-06\"},{\"campsiteId\":6,\"startDate\":\"2016-06-09\",\"endDate\":\"2016-06-12\"},{\"campsiteId\":6,\"startDate\":\"2016-06-16\",\"endDate\":\"2016-06-16\"},{\"campsiteId\":7,\"startDate\":\"2016-06-03\",\"endDate\":\"2016-06-04\"},{\"campsiteId\":7,\"startDate\":\"2016-06-07\",\"endDate\":\"2016-06-09\"},{\"campsiteId\":7,\"startDate\":\"2016-06-13\",\"endDate\":\"2016-06-16\"},{\"campsiteId\":8,\"startDate\":\"2016-06-01\",\"endDate\":\"2016-06-02\"},{\"campsiteId\":8,\"startDate\":\"2016-06-05\",\"endDate\":\"2016-06-09\"},{\"campsiteId\":9,\"startDate\":\"2016-06-03\",\"endDate\":\"2016-06-06\"},{\"campsiteId\":9,\"startDate\":\"2016-06-11\",\"endDate\":\"2016-06-16\"}]}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Array",
            "description": "<p>of objects that contain the gapSize and the result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n  {\n    \"gapSize\": 2,\n    \"result\": [\n \t {\n \t   \"id\": 5,\n \t   \"name\": \"Daniel Boone Bungalow\"\n \t },\n \t {\n \t   \"id\": 6,\n \t   \"name\": \"Teddy Rosevelt Tent Site\"\n \t },\n \t {\n \t   \"id\": 8,\n \t   \"name\": \"Bear Grylls Cozy Cave\"\n \t },\n \t {\n \t   \"id\": 9,\n \t   \"name\": \"Wyatt Earp Corral\"\n \t }\n    ]\n  },\n  {\n    \"gapSize\": 3,\n    \"result\": [\n \t {\n \t   \"id\": 1,\n \t   \"name\": \"Grizzly Adams Adventure Cabin\"\n \t },\n \t {\n \t   \"id\": 4,\n \t   \"name\": \"Davey Crockett Camphouse\"\n \t },\n \t {\n \t   \"id\": 5,\n \t   \"name\": \"Daniel Boone Bungalow\"\n \t },\n \t {\n \t   \"id\": 6,\n \t   \"name\": \"Teddy Rosevelt Tent Site\"\n \t },\n \t {\n \t   \"id\": 8,\n \t   \"name\": \"Bear Grylls Cozy Cave\"\n \t },\n \t {\n \t   \"id\": 9,\n \t   \"name\": \"Wyatt Earp Corral\"\n \t }\n    ]\n  }\n]",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3030/api/camp/search-demo"
      }
    ],
    "version": "0.0.0",
    "filename": "server/routes/camp-routes.apidoc.js",
    "groupTitle": "Campspot"
  }
] });
