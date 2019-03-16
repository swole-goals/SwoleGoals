from selenium import webdriver

baseUrl = "https://strengthlevel.com"
driver = webdriver.Firefox(executable_path="/usr/bin/geckodriver/geckodriver")
driver.set_page_load_timeout(10)
try:
    driver.get(baseUrl)
except:
    pass
try:
    genderSelection = driver.find_element_by_css_selector("#gender")
    genderOptions = [x for x in genderSelection.find_elements_by_tag_name("option")]
    ageSelection = driver.find_element_by_css_selector("#formCalc").find_elements_by_xpath("//div[@class='pure-control-group']")[0].find_element_by_css_selector(".form__input--small")
    ageOptions = [x for x in ageSelection.find_elements_by_tag_name("option")]
    exerciseTypeSelection = driver.find_element_by_css_selector("#exerciseType")
    exerciseTypeOptions = [x for x in exerciseTypeSelection.find_elements_by_tag_name("option")]
    exercisesSelection = driver.find_element_by_css_selector("#exercise")
    exercisesOptions = [x for x in exercisesSelection.find_elements_by_tag_name("option")]
    genderValues = []
    ageValues = []
    exerciseTypeValues = []
    exerciseValues = []
    weightValues = []
    for i in range(10, 25):
        weightValues.append(i * 10)
    for genderOption in genderOptions:
        genderValues.append(genderOption.get_attribute("value"))
    for gender in genderValues:
        print(gender)
    for ageOption in ageOptions:
        ageValues.append(ageOption.get_attribute("value"))
    for exerciseTypeOption in exerciseTypeOptions:
        exerciseTypeValues.append(exerciseTypeOption.get_attribute("value"))
    for exerciseOption in exercisesOptions:
        exerciseValues.append(exerciseOption.get_attribute("value"))
    for gender in genderValues:
        #set gender
        driver.find_element_by_css_selector("#gender").find_elements_by_css_selector("option")[genderValues.index(gender)].click()
        for age in ageValues:
            #set age
            driver.find_element_by_css_selector("#formCalc").find_elements_by_xpath("//div[@class='pure-control-group']")[0].find_element_by_css_selector(".form__input--small").find_elements_by_tag_name("option")[ageValues.index(age)].click()
            for exerciseType in exerciseTypeValues:
                #set exercise type
                driver.find_element_by_css_selector("#exerciseType").find_elements_by_css_selector("option")[exerciseTypeValues.index(exerciseType)].click()
                for exercise in exerciseValues:
                    #set exercise
                    driver.find_element_by_css_selector("#exercise").find_elements_by_css_selector("option")[exerciseValues.index(exercise)].click()
                    for weight in weightValues:
                        #set bodymass
                        driver.execute_script("document.getElementById('bodymass').setAttribute('value', '" + str(weight) + "')")
                        #set lift mass to something
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
                        print(fitness + gender + " " + age + " " + exerciseType + " " + exercise)
    """
    for genderOption in genderOptions:
        genderOption.click()
        gender = genderOption.get_attribute("innerHTML")
        for ageOption in ageOptions:
            ageOption.click()
            age = ageOption.get_attribute("innerHTML")
            for exerciseTypeOption in exerciseTypeOptions:
                exerciseTypeOption.click()
                exerciseType = exerciseTypeOption.get_attribute("innerHTML")
                for exercisesOption in exercisesOptions:
                    exercisesOption.click()
                    exercise = exercisesOption.get_attribute("innerHTML")
                    driver.execute_script("document.getElementById('bodymass').setAttribute('value', '100')")
                    driver.execute_script("document.getElementById('liftmass').setAttribute('value', '100')")
                    try:
                        submit.click();
                    except:
                        pass
    """
finally:
    driver.quit()
