# !# /bin/bash -x

#delete existing instances/deployments in the environment and the recreate/redeploy and run

echo "Deploying eShop/server to google cloud \n"

3 Returns a list of all gcloud deployment versions
gcloud_list() {
    local gcloud="$(gcloud app versions list)"
    local array=()
    for word in $gcloud
    do
     array+=($word)
    done
    echo "${array[@]}" 
}

# Deletes unnecessary deployments that are not utilized
delete_version() {
    local array=($@)
    for 
}