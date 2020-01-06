require 'csv'

namespace :csv do

  desc "Import ballers"
  task :import_ballers => :environment do
    User.create(name: "Amira Alhassan", email: "amiraalha@gmail.com")
    User.create(name: "Kacy", email: "Kacychristine@gmail.com")
    User.create(name: "Katie Urban", email: "katharineurban@gmail.com")
    User.create(name: "Alex Washington", email: "aagwash@gmail.com")
    User.create(name: "Alison Becker", email: "albex@mac.com")
    User.create(name: "Alison Brown", email: "amb1264@gmail.com")
    User.create(name: "Amy Wieseneck", email: "amywies@gmail.com")
    User.create(name: "Anikka Sellz", email: "A.sellz@gmail.com")
    User.create(name: "Audrey Rufe", email: "audrey.rufe@gmail.com")
    User.create(name: "Briana Brickley", email: "briana.brickley@gmail.com")
    User.create(name: "Burford.dom", email:  "Burford.dom@gmail.com")
    User.create(name: "Chikira Bennett" , email:"bennettchikira@gmail.com")
    User.create(name: "Donielle Muransky" , email:"dcmuransky@gmail.com")
    User.create(name: "Emily Friedman" , email:"mlefriedman@gmail.com")
    User.create(name: "Jamie Mcandrews" , email:"jamie.mcandrews@gmail.com")
    User.create(name: "Jesse Thomas" , email:"Jessethomasmusic@gmail.com")
    User.create(name: "Katie Letien" , email:"katie.letien@gmail.com")
    User.create(name: "Kim Merino" , email:"dafabulousteach@gmail.com")
    User.create(name: "LP Lauren Palmigiano" , email:"laurenpdot@gmail.com")
    User.create(name: "Leora Juster" , email:"leorajuster@gmail.com")
    User.create(name: "MONSTER ROW" , email:"rosanne623@yahoo.com")
    User.create(name: "Mariama Bonetti" , email:"mariamabonetti@gmail.com")
    User.create(name: "Michelle Bryar" , email:"michelle.bryar@gmail.com")
    User.create(name: "Mo", email: "mowelchmo@gmail.com")
    User.create(name: "Nazanin Subat" , email:"nazanin.subat@gmail.com")
    User.create(name: "Savannah Gore" , email:"savannah.gore1@gmail.com")
    User.create(name: "Tamar Grey" , email:"tamargrey11@gmail.com")
    User.create(name: "YoshieAsano" , email:"baburu.xie@gmail.com")
    User.create(name: "miriam", email: "thinkmiriam@gmail.com")
    User.create(name: "Nadiya Chettiar" , email: "nadiyachettiar@gmail.com")

    User.find_each do |u|
      Participation.create(event_id: 1, user_id: u.id, attending: false, amount_paid: 0)
    end
  end
end