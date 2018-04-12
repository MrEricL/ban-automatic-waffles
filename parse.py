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
for state in states:
    state_shootings[state] = 0

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

print state_shootings # go to the terminal and copy this dictionary!!
# it's what we want!!