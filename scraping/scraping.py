#Exercises
    #Type
    #Muscles
    #Equipment
    #Level (varchar)
    #images (varchar)
    #Review/Rating (varchar)
    #Instructions (varchar)
    #Caution
    #Variations (varchar)
#plan
    #Go through all muscle groups
    #Click each exercise
from selenium import webdriver

baseUrl = "https://www.bodybuilding.com"
driver = webdriver.Chrome(executable_path="/Users/Nickp/Desktop/chromedriver.exe")
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

exerciseName = ["" for url in range(len(exerciseUrls))]
types = ["" for url in range(len(exerciseUrls))]
muscleWorked = ["" for url in range(len(exerciseUrls))]
equipment = ["" for url in range(len(exerciseUrls))]
level = ["" for url in range(len(exerciseUrls))]
instructions = ["" for url in range(len(exerciseUrls))]
caution = ["" for url in range(len(exerciseUrls))]
variations = ["" for url in range(len(exerciseUrls))]
rating = ["" for url in range(len(exerciseUrls))]

for i in range(len(exerciseUrls)):
    try:
        driver.get(exerciseUrls[i])
        exerciseName[i] = driver.find_element_by_xpath("//*[@id='js-ex-content']/div/section[1]/div[1]/h2").get_attribute("innerHTML")
        exerciseName[i] = exerciseName[i].strip()
        types[i] = driver.find_element_by_xpath("//*[@id='js-ex-content']/div/section[2]/div[2]/ul/li[1]/a").get_attribute("innerHTML")
        types[i] = types[i].strip()
        muscleWorked[i] = driver.find_element_by_xpath("//*[@id='js-ex-content']/div/section[2]/div[2]/ul/li[2]/a").get_attribute("innerHTML")
        muscleWorked[i] = muscleWorked[i].strip()
        equipment[i] = driver.find_element_by_xpath("//*[@id='js-ex-content']/div/section[2]/div[2]/ul/li[3]/a").get_attribute("innerHTML")
        equipment[i] = equipment[i].strip()
        level[i] = driver.find_element_by_xpath("//*[@id='js-ex-content']/div/section[2]/div[2]/ul/li[4]").get_attribute("innerHTML")
        level[i] = level[i].replace('Level:', "") #formatting
        level[i] = level[i].strip()
        rating[i] = driver.find_element_by_xpath("//*[@id='js-ex-content']/div/section[2]/div[3]/div/div[1]").get_attribute("innerHTML")
        rating[i] = rating[i].strip()
        instructionList = driver.find_element_by_xpath("//*[@id='js-ex-content']/div/section[4]/div/div[2]/ol")
        instructionList = instructionList.find_elements_by_tag_name("li")
        x = 1 ##instruction number
        for j in range(len(instructionList)):
            instructions[i] += " " + str(x) + ". " + instructionList[j].text
            x += 1

        """ ##might not want to include
        if(driver.find_elements_by_xpath("//*[contains(text(),'Caution:')]").__sizeof__() > 0):
            caution[i] = driver.find_element_by_xpath("//*[contains(text(),'Caution:')]").find_element_by_xpath("..").get_attribute("innerHTML")
            caution[i] = caution[i].replace("<strong>Caution:</strong> ", "") #formating

        if(driver.find_elements_by_xpath("//*[contains(text(),'Variations:')]").__sizeof__() > 0):
            variations[i] = driver.find_element_by_xpath("//*[contains(text(),'Variations:')]").find_element_by_xpath("..").get_attribute("innerHTML")
            variations[i] = variations[i].replace("<strong>Variations:</strong>" , "") #formating
        """

    except:#timeout
        pass



sqlFile = open("file.txt", "w+")
for i in range(len(exerciseUrls)):
    sqlFile.write(exerciseName[i] + "\t")
    sqlFile.write(muscleWorked[i] + "\t")
    sqlFile.write(equipment[i] + "\t")
    sqlFile.write(level[i] + "\t")
    sqlFile.write(rating[i] + "\t")
    sqlFile.write(instructions[i] + "\n")

sqlFile.close()

driver.quit();
