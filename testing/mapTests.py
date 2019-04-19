from selenium import webdriver
import random
import time
baseUrl = "http://swolegoals.s3-website.us-east-2.amazonaws.com/app-map"
exerciseUrl = "http://swolegoals.s3-website.us-east-2.amazonaws.com/app-exercise-current/"
driver = webdriver.Firefox(executable_path="/usr/bin/geckodriver/geckodriver")
driver.set_page_load_timeout(20)
try:
    driver.get(baseUrl)
except:
    pass
try:
    time.sleep(5)
    print "wake up"
    exercises = driver.find_elements_by_xpath("//button[@class='tile']")
    #exercises = driver.find_elements_by_css_selector(".tile")
    challenge = driver.find_element_by_css_selector('#challenge').extract()
    exerciseNames = [x.text for x in exercises]
    length = len(exerciseNames)  
    for name in exerciseNames:
        driver.get(exerciseUrl + challenge + "/" + name)

        print i
        print driver.find_elements_by_css_selector(".tile")
        #driver.driver.find_elements_by_xpath("//button[@class='tile']")[i].click()
        driver.find_element_by_css_selector(".btn-success").click()
        decrease = random.randint(1, 25)
        increase = random.randint(1, 25)
        for i in range(decrease):#reduce reps completed
            driver.find_element_by_css_selector(".btn-danger").click()
        for i in range(increase):#increase reps completed
            driver.find_element_by_css_selector(".btn-success").click()
        driver.find_element_by_css_selector(".btn-primary").click()

    '''
    exerciseTypeValues = []
    exerciseValues = []
    for exerciseTypeOption in exerciseTypeOptions:
        exerciseTypeValues.append(exerciseTypeOption.get_attribute("value"))
    for exerciseType in exerciseTypeValues:
        #select exercise type
        driver.find_element_by_css_selector("#exerciseType").find_elements_by_css_selector("option")[exerciseTypeValues.index(exerciseType)].click()
        
        #add exercises
        exercisesSelection = driver.find_element_by_css_selector("#exercise")
        exercisesOptions = [x for x in exercisesSelection.find_elements_by_tag_name("option")]
        exerciseValues = []
        for exerciseOption in exercisesOptions:
            exerciseValues.append(exerciseOption.get_attribute("value"))
        
        #set exercise type
        for exercise in exerciseValues:
        
            #set exercise
            driver.find_element_by_css_selector("#exercise").find_elements_by_css_selector("option")[exerciseValues.index(exercise)].click()
                
            #set weight
            driver.execute_script("document.getElementById('bodymass').setAttribute('value', '150')")
            
            #set lift mass to something
            #fix for body weight exercises
            if exerciseType != str(2):
                driver.execute_script("document.getElementById('liftmass').setAttribute('value', '100')")
            #submit
            try:
                driver.find_element_by_css_selector(".pure-button.pure-button-primary.calculator__primaryaction").click()
            except:
                pass
                        
            #get result
            results = driver.find_element_by_css_selector(".pure-table.pure-table-striped.standards__table").find_element_by_css_selector("tbody").find_element_by_css_selector("tr").find_elements_by_css_selector("td")
                        
            #print result
            fitness = "";
            for result in results:
                fitness += result.get_attribute("innerHTML").split()[0] + " "
            print(fitness + exerciseType + " " + exercise)
    '''
finally:
    pass
    #driver.quit()
