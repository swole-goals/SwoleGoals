#Exercises 
    #Type
    #Muscles
    #Equipment 
    #Level (varchar)
    #images (varchar)
    #Review (varchar)
    #Instructions (varchar)
    #Caution
    #Variations (varchar)
#plan
    #Go through all muscle groups
    #Click each exercise
from selenium import webdriver
baseUrl = "https://www.bodybuilding.com"
driver = webdriver.Firefox(executable_path="/usr/bin/geckodriver/geckodriver")
driver.set_page_load_timeout(5)
try:
    driver.get(baseUrl + "/exercises/muscle/chest")
except:#timeout
    pass
"""
muscleGroups = driver.find_element_by_xpath("//section[@class='ExCategory-formSection']").find_element_by_css_selector('ul').find_elements_by_css_selector('li')
for muscle in muscleGroups:
    muscle.find_element_by_css_selector('label').click()
"""

for i in range(0, 2):
    try: 
        nextButton = driver.find_element_by_css_selector(".bb-flat-btn.bb-flat-btn--size-lg.bb-spinner-btn.js-ex-loadMore.ExLoadMore-btn").click()
    except:
        break
exercises = driver.find_elements_by_xpath("//h3[@class='ExHeading ExResult-resultsHeading']")
images = driver.find_elements_by_xpath("//img[@class='ExImg ExResult-img  lazyloaded']")
exerciseUrls = ["" for exercise in range(len(exercises))]
for i in range(len(exercises)):
    exerciseUrls[i] = exercises[i].find_element_by_css_selector('a').get_attribute('href')
for url in exerciseUrls:
    try:
        driver.get(url)
    except:#timeout
        pass
for image in images:
    print(image.get_attribute("src"))

driver.quit();
