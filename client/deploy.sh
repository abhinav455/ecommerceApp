# !# /bin/bash -x

#delete existing instances/deployments in the environment and then recreate/redeploy and run

echo "Deploying eShop/server to google cloud \n"

#FN Returns a list of all gcloud deployment versions
gcloud_list() {
    local gcloud="$(gcloud -q app versions list)"
    local array=()
    for word in $gcloud
    do
     array+=($word)
    done
    echo "${array[@]}" #return 
}

# FN Deletes unnecessary deployments that are not utilized
delete_version() {
    local array=($@) #params
    for ((i=0; i< ${#array[@]}; ++i)); do
        if [[ ${array[$i]} == *"0.00"* ]]; then  #wildcard match any string containing 0.00
            local version=${array[$i-1]}
            local command="gcloud -q app versions delete $version"
            eval $command
        fi
    done        
}

#execute fns
list=$(gcloud_list)
delete_version $list

#deploy to google cloud provider
gcloud -q app deploy --stop-previous-version 
            #deploys using the app.yml file in the current directory like docker-compose.yml, take all current directory files 
            #stop current not fully deployed also
            #it sees the docker-compose file thus runs the env as containers looking at it
