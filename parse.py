import json, urllib2
from pprint import pprint
import csv

places = []
people = []
states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", 
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

state_shootings = {} # this is what we want!!!!
state_gender = {}
state_race = {}
state_age = {}

for state in states:
    state_shootings[state] = 0

for state in states:
    state_gender[state] = {}
    state_gender[state]['female'] = 0
    state_gender[state]['male'] = 0

for state in states:
    state_race[state] = {}
    state_race[state]['white'] = 0
    state_race[state]['black'] = 0
    state_race[state]['asian'] = 0
    state_race[state]['hispanic'] = 0 # Hispanic
    # state_race[state]['Latino'] = 0
    # state_race[state]['African American'] = 0
    # state_race[state]['Caucasion'] = 0
    # state_race[state]['Alaska Native'] = 0

for state in states:
    state_age[state] = {}
    state_age[state]['0-20'] = 0
    state_age[state]['21-30'] = 0
    state_age[state]['31-40'] = 0
    state_age[state]['41-50'] = 0
    state_age[state]['51+'] = 0

counting =0

with open('events.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        layers = row['Address'].split(", ")
        try:
            if layers[2] == 'USA':
                state_shootings[layers[1][:2]]+=1
        except:
            print 'except message; ignore'
        places.append(row['Address'])
        people.append(row['Info about participants'])
        listy = row['Info about participants']
        new_list = listy.replace("u'", "'")
        new_list = new_list.replace("'", '"')
        new_list = new_list.replace("True", 'true')
        new_list = new_list.replace("False", 'false')

        try:
            new_list = json.loads(new_list)
            counting += 1
            for person in new_list:
                if person['is_victim'] == True and layers[2] == 'USA':
                    #gender
                    if person['gender'] == 'Male':
                        state_gender[layers[1][:2]]['male'] +=1
                    else:
                        state_gender[layers[1][:2]]['female'] +=1
                    #race
                    if person['race'] == 'white' or person['race'] == 'Caucasian':
                        state_race[layers[1][:2]]['white'] +=1
                    elif person['race'] == 'black' or person['race'] == 'African American':
                        state_race[layers[1][:2]]['black'] +=1
                    elif person['race'] == 'Latino' or person['race'] == 'Hispanic':
                        state_race[layers[1][:2]]['hispanic'] +=1
                    else:
                        state_race[layers[1][:2]]['asian'] +=1
                    #age
                    if int(person['age']) < 21:
                        state_age[layers[1][:2]]['0-20'] += 1
                    elif int(person['age']) < 31:
                        state_age[layers[1][:2]]['21-30'] += 1
                    elif int(person['age']) < 41:
                        state_age[layers[1][:2]]['31-40'] += 1
                    elif int(person['age']) < 51:
                        state_age[layers[1][:2]]['41-50'] += 1
                    else:
                        state_age[layers[1][:2]]['51+'] += 1
                        
        except:
            print "couldn't parse it....?"
        # print new_list

print '\n\nby gender:'
print state_gender
print '\n\nby race:'
print state_race
print '\n\nby age:'
print state_age
# print state_shootings # go to the terminal and copy this dictionary!!
# it's what we want!!

# j = '[{"injured": false, "name": "Andrew Joseph Todd", "hospitalized": false, "gender": "Male", "age": "20", "race": "", "killed": true, "is_victim": true}, {"injured": false, "name": "", "hospitalized": false, "gender": "Male", "age": "", "race": "", "killed": false, "is_victim": false}, {"injured": false, "name": "", "hospitalized": false, "gender": "Male", "age": "", "race": "", "killed": false, "is_victim": false}]'
# d = json.loads(j)
# print d
