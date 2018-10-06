/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('Each feed in allFeeds object has url and not empty', function() {
            allFeeds.forEach(function(feed){
            expect(feed.url).toBeDefined();
            expect(feed.url).not.toBe("");
        
        });
     });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Insures that each of the allFeeds name are defined and not empty', function(){
            var myfeed;
            for(var i=0; i<allFeeds.length; i++){
                myfeed=allFeeds[i];
                expect(myfeed.name).toBeDefined();
                expect(myfeed.name).not.toBe("");
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function(){ 
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        var hiddingMe = document.querySelector('body'); // refeactor used in the following `it` clause
        it('Ensures the menu is hidden by default and have showing an hiding of menu element', function(){

            expect($(hiddingMe).hasClass('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('Menu visibility toggles', function(){
            
            var clickable = document.querySelector(".menu-icon-link");
            clickable.click();

            //Verify that class name is not there
            expect(hiddingMe.className).not.toContain('menu-hidden');

            clickable.click();

            //verify that the class name exist.
            expect(hiddingMe.className).toContain('menu-hidden');

            // // $(clickable).toggleClass('menu-hidden'); //did not work
            // expect(hiddingMe.className).not.hasClass("menu-hidden");//did not work

          })
    });

    describe('Initial Entries', function(){
    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
            //ajax call is sent to urls
            loadFeed(0, done);
        });

        it('Verify there is an `.entry` and it is complete', function(){
            var myEntry= document.querySelectorAll('.feed .entry');//collects full array of elements that have both classes.
            expect($(myEntry).length).not.toBe(0);
            //Array size can not be below 1.
        });

    });
    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    describe('New Feed Selection', function(){

        var firstCome;
        var secondCome;
        
        beforeEach(function(done){
            loadFeed(0, function(){
                firstCome = document.querySelector('.feed').innerHTML;// unsure if it should be .textContent or .innerHTML
                loadFeed(1, function(){
                    secondCome = document.querySelector('.feed').innerHTML;// unsure if it should be .textContent or .innerHTML
                    done();//callback
                
            });
                
            });


        });
        it('See changes in content of feed loading ',function(){
            expect(firstCome===secondCome).not.toBe(true);
        });
    });

}());
