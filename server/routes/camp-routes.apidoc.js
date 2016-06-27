
/**
 *
 * @apiGroup Campspot
 *
 * @api {post} /api/camp/search	Search Campgrounds
 * @apiName search
 *
 * @apiDescription Search for open campgrounds one of three ways:<br/><hr/>
 * 		1] You may post to the API by performing a simple request with 'curl'. <br/><br/>
 * 		2] You can also copy and paste the payloads from the tabbed section below
 * 		into the <strong><a href="#footer">form at the bottom of this page</a></strong> and click 'Send'. The API will return
 * 		a JSON resposne payload.<br/><br/>
 * 		3] You can use <strong><a href="https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop" target="_blank">Postman,
 * 		a Google Chrome Application</a></strong> to run the same payloads mentioned in the second alternative. <br/><br/>
 *
 * @apiExample {curl} Command Line Example:
 * 		# once you 'gulp serve':
 * 		# use curl to post the json file
 *		curl -v -H "Content-Type: application/json" -XPOST --data "@testcase.json" "http://localhost:3030/api/camp/search"
 *
 *		###############
 *		#   NOTE::    #
 *		#############################################################################################################
 *		#   Copying the sample payloads below and running them in Postman or the Sample Runner is far easier.       #
 *		#############################################################################################################
 *
 * @apiParam {json}       content      Copy and Paste these samples below in the <strong><a href="#footer">Sample Runner</a></strong> or in <strong><a href="https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop" target="_blank">Postman</a></strong>.
 * @apiParamExample {json} Example:: Request From E-Mail
 * {"search":{"startDate":"2016-06-07","endDate":"2016-06-10"},"gapRules":[{"gapSize":2},{"gapSize":3}],"campsites":[{"id":1,"name":"Grizzly Adams Adventure Cabin"},{"id":2,"name":"Lewis and Clark Camp Spot"},{"id":3,"name":"Jonny Appleseed Log Cabin"},{"id":4,"name":"Davey Crockett Camphouse"},{"id":5,"name":"Daniel Boone Bungalow"},{"id":6,"name":"Teddy Rosevelt Tent Site"},{"id":7,"name":"Edmund Hillary Igloo"},{"id":8,"name":"Bear Grylls Cozy Cave"},{"id":9,"name":"Wyatt Earp Corral"}],"reservations":[{"campsiteId":1,"startDate":"2016-06-01","endDate":"2016-06-04"},{"campsiteId":1,"startDate":"2016-06-11","endDate":"2016-06-13"},{"campsiteId":2,"startDate":"2016-06-08","endDate":"2016-06-09"},{"campsiteId":3,"startDate":"2016-06-04","endDate":"2016-06-06"},{"campsiteId":3,"startDate":"2016-06-14","endDate":"2016-06-16"},{"campsiteId":4,"startDate":"2016-06-03","endDate":"2016-06-05"},{"campsiteId":4,"startDate":"2016-06-13","endDate":"2016-06-14"},{"campsiteId":5,"startDate":"2016-06-03","endDate":"2016-06-06"},{"campsiteId":5,"startDate":"2016-06-12","endDate":"2016-06-14"},{"campsiteId":6,"startDate":"2016-06-04","endDate":"2016-06-06"},{"campsiteId":6,"startDate":"2016-06-11","endDate":"2016-06-12"},{"campsiteId":6,"startDate":"2016-06-16","endDate":"2016-06-16"},{"campsiteId":7,"startDate":"2016-06-03","endDate":"2016-06-04"},{"campsiteId":7,"startDate":"2016-06-07","endDate":"2016-06-09"},{"campsiteId":7,"startDate":"2016-06-13","endDate":"2016-06-16"},{"campsiteId":8,"startDate":"2016-06-01","endDate":"2016-06-02"},{"campsiteId":8,"startDate":"2016-06-05","endDate":"2016-06-06"},{"campsiteId":9,"startDate":"2016-06-03","endDate":"2016-06-05"},{"campsiteId":9,"startDate":"2016-06-12","endDate":"2016-06-16"}]}
 * @apiParamExample {json} Example:: Request With No Opening
 * {"search":{"startDate":"2016-06-07","endDate":"2016-06-10"},"gapRules":[{"gapSize":2},{"gapSize":3}],"campsites":[{"id":1,"name":"Grizzly Adams Adventure Cabin"},{"id":2,"name":"Lewis and Clark Camp Spot"},{"id":3,"name":"Jonny Appleseed Log Cabin"},{"id":4,"name":"Davey Crockett Camphouse"},{"id":5,"name":"Daniel Boone Bungalow"},{"id":6,"name":"Teddy Rosevelt Tent Site"},{"id":7,"name":"Edmund Hillary Igloo"},{"id":8,"name":"Bear Grylls Cozy Cave"},{"id":9,"name":"Wyatt Earp Corral"}],"reservations":[{"campsiteId":1,"startDate":"2016-06-01","endDate":"2016-06-08"},{"campsiteId":1,"startDate":"2016-06-11","endDate":"2016-06-13"},{"campsiteId":2,"startDate":"2016-06-08","endDate":"2016-06-09"},{"campsiteId":3,"startDate":"2016-06-04","endDate":"2016-06-06"},{"campsiteId":3,"startDate":"2016-06-09","endDate":"2016-06-16"},{"campsiteId":4,"startDate":"2016-06-03","endDate":"2016-06-08"},{"campsiteId":4,"startDate":"2016-06-13","endDate":"2016-06-14"},{"campsiteId":5,"startDate":"2016-06-03","endDate":"2016-06-08"},{"campsiteId":5,"startDate":"2016-06-12","endDate":"2016-06-14"},{"campsiteId":6,"startDate":"2016-06-04","endDate":"2016-06-06"},{"campsiteId":6,"startDate":"2016-06-09","endDate":"2016-06-12"},{"campsiteId":6,"startDate":"2016-06-16","endDate":"2016-06-16"},{"campsiteId":7,"startDate":"2016-06-03","endDate":"2016-06-04"},{"campsiteId":7,"startDate":"2016-06-07","endDate":"2016-06-09"},{"campsiteId":7,"startDate":"2016-06-13","endDate":"2016-06-16"},{"campsiteId":8,"startDate":"2016-06-01","endDate":"2016-06-02"},{"campsiteId":8,"startDate":"2016-06-05","endDate":"2016-06-09"},{"campsiteId":9,"startDate":"2016-06-03","endDate":"2016-06-06"},{"campsiteId":9,"startDate":"2016-06-09","endDate":"2016-06-16"}]}
 * @apiParamExample {json} Example:: Partially Available Request
 * {"search":{"startDate":"2016-06-07","endDate":"2016-06-10"},"gapRules":[{"gapSize":2},{"gapSize":3}],"campsites":[{"id":1,"name":"Grizzly Adams Adventure Cabin"},{"id":2,"name":"Lewis and Clark Camp Spot"},{"id":3,"name":"Jonny Appleseed Log Cabin"},{"id":4,"name":"Davey Crockett Camphouse"},{"id":5,"name":"Daniel Boone Bungalow"},{"id":6,"name":"Teddy Rosevelt Tent Site"},{"id":7,"name":"Edmund Hillary Igloo"},{"id":8,"name":"Bear Grylls Cozy Cave"},{"id":9,"name":"Wyatt Earp Corral"}],"reservations":[{"campsiteId":1,"startDate":"2016-06-01","endDate":"2016-06-04"},{"campsiteId":1,"startDate":"2016-06-11","endDate":"2016-06-13"},{"campsiteId":2,"startDate":"2016-06-08","endDate":"2016-06-09"},{"campsiteId":3,"startDate":"2016-06-04","endDate":"2016-06-06"},{"campsiteId":3,"startDate":"2016-06-14","endDate":"2016-06-16"},{"campsiteId":4,"startDate":"2016-06-03","endDate":"2016-06-05"},{"campsiteId":4,"startDate":"2016-06-13","endDate":"2016-06-14"},{"campsiteId":5,"startDate":"2016-06-03","endDate":"2016-06-08"},{"campsiteId":5,"startDate":"2016-06-12","endDate":"2016-06-14"},{"campsiteId":6,"startDate":"2016-06-04","endDate":"2016-06-06"},{"campsiteId":6,"startDate":"2016-06-09","endDate":"2016-06-12"},{"campsiteId":6,"startDate":"2016-06-16","endDate":"2016-06-16"},{"campsiteId":7,"startDate":"2016-06-03","endDate":"2016-06-04"},{"campsiteId":7,"startDate":"2016-06-07","endDate":"2016-06-09"},{"campsiteId":7,"startDate":"2016-06-13","endDate":"2016-06-16"},{"campsiteId":8,"startDate":"2016-06-01","endDate":"2016-06-02"},{"campsiteId":8,"startDate":"2016-06-05","endDate":"2016-06-09"},{"campsiteId":9,"startDate":"2016-06-03","endDate":"2016-06-06"},{"campsiteId":9,"startDate":"2016-06-11","endDate":"2016-06-16"}]}
 *
 * @apiSuccess {Array} Array of objects that contain the gapSize and the result
 * @apiSuccessExample Example:: Success-Response
 * [
 *   {
 *     "gapSize": 2,
 *     "result": [
 *  	 {
 *  	   "id": 5,
 *  	   "name": "Daniel Boone Bungalow"
 *  	 },
 *  	 {
 *  	   "id": 6,
 *  	   "name": "Teddy Rosevelt Tent Site"
 *  	 },
 *  	 {
 *  	   "id": 8,
 *  	   "name": "Bear Grylls Cozy Cave"
 *  	 },
 *  	 {
 *  	   "id": 9,
 *  	   "name": "Wyatt Earp Corral"
 *  	 }
 *     ]
 *   },
 *   {
 *     "gapSize": 3,
 *     "result": [
 *  	 {
 *  	   "id": 1,
 *  	   "name": "Grizzly Adams Adventure Cabin"
 *  	 },
 *  	 {
 *  	   "id": 4,
 *  	   "name": "Davey Crockett Camphouse"
 *  	 },
 *  	 {
 *  	   "id": 5,
 *  	   "name": "Daniel Boone Bungalow"
 *  	 },
 *  	 {
 *  	   "id": 6,
 *  	   "name": "Teddy Rosevelt Tent Site"
 *  	 },
 *  	 {
 *  	   "id": 8,
 *  	   "name": "Bear Grylls Cozy Cave"
 *  	 },
 *  	 {
 *  	   "id": 9,
 *  	   "name": "Wyatt Earp Corral"
 *  	 }
 *     ]
 *   }
 * ]
 *
 * @apiSampleRequest http://localhost:3030/api/camp/search-demo
 * 
 */