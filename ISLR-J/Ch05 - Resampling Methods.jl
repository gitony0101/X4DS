### A Pluto.jl notebook ###
# v0.10.0

using Markdown

# ╔═╡ 07adb61e-4066-4089-a237-5a2e7958cdb3
begin
    using LinearAlgebra
    using Plots
    using DataFrames, CSV
end

# ╔═╡ 33d00935-35ed-4abb-80d1-b0ffb2ba998d
autoData = CSV.File("dataset/Auto.csv"; missingstring="?") |> DataFrame;

# ╔═╡ e1138abb-864c-40bd-a668-399ae0b95662
function getMSEOfValidation(train, validation)
    ols_1 = lm(@formula(mpg ~  horsepower), train);
    ols_2 = lm(@formula(mpg ~  horsepower + horsepower^2), train);
    ols_3 = lm(@formula(mpg ~  horsepower + horsepower^2 + horsepower^3), train);
    ols_4 = lm(@formula(mpg ~  horsepower + horsepower^2 + horsepower^3 + horsepower^4), train);
    ols_5 = lm(@formula(mpg ~  horsepower + horsepower^2 + horsepower^3 + horsepower^4 + horsepower^5), train);
    ols_6 = lm(@formula(mpg ~  horsepower + horsepower^2 + horsepower^3 + horsepower^4 + horsepower^5 + horsepower^6), train);
    ols_7 = lm(@formula(mpg ~  horsepower + horsepower^2 + horsepower^3 + horsepower^4 + horsepower^5 + horsepower^6 + horsepower^7), train);
    ols_8 = lm(@formula(mpg ~  horsepower + horsepower^2 + horsepower^3 + horsepower^4 + horsepower^5 + horsepower^6 + horsepower^7 + horsepower^8), train);
    ols_9 = lm(@formula(mpg ~  horsepower + horsepower^2 + horsepower^3 + horsepower^4 + horsepower^5 + horsepower^6 + horsepower^7 + horsepower^8 + horsepower^9), train);
    ols_10 = lm(@formula(mpg ~  horsepower + horsepower^2 + horsepower^3 + horsepower^4 + horsepower^5 + horsepower^6 + horsepower^7 + horsepower^8 + horsepower^9 + horsepower^10), train);

    all_models = [ols_1, ols_2, ols_3, ols_4, ols_5, ols_6, ols_7, ols_8, ols_9, ols_10];
    result = []
    for model in all_models
        p = predict(model, validation)
        mse = sum((validation[:mpg] - p).^2) / length(p)
        push!(result, mse)
    end
    return result
end

# ╔═╡ 2ef1ee68-2dc8-4dc8-8ca8-e367fe882c38
# Figure 5.2
clean_autoData = dropmissing(autoData, :horsepower)

indices = collect(1: nrow(clean_autoData))
shuffle!(indices)

train = clean_autoData[indices[1:196], :]
validation = clean_autoData[indices[197:end], :]

mse = getMSEOfValidation(train, validation)
p1 = plot(mse, xlabel="Degree of Polynomial", ylabel="Mean Squared Error", legend=false, markershape = :hexagon, lc="red", markercolor = :red)

p2 = plot(mse)
for i=1:10
    shuffle!(indices)
    train = clean_autoData[indices[1:196], :]
    validation = clean_autoData[indices[197:end], :]
    mse = getMSEOfValidation(train, validation)

    p2 = plot!(mse, xlabel="Degree of Polynomial", ylabel="Mean Squared Error", legend=false)
end

plot(p1, p2)

# ╔═╡ 7fcc3734-5007-4c82-99aa-e6f3e1911a5e
# Figure 5.4
mse = zeros(10)
for i in 1:nrow(clean_autoData)
    indices = collect(1:nrow(clean_autoData))
    popat!(indices, i)
    train = clean_autoData[indices, :]
    validation = clean_autoData[[i], :]
    mse = mse + getMSEOfValidation(train, validation)
end

mse = mse / nrow(clean_autoData)
p1 = plot(mse, xlabel="Degree of Polynomial", ylabel="Mean Squared Error", legend=false, markershape = :hexagon, lc="blue", markercolor = :blue, title="LOOCV")

############################
indices = collect(1:nrow(clean_autoData))
batch = nrow(clean_autoData) ÷ 10
n = nrow(clean_autoData)

mse_k = zeros(10, 9)
for i in 1:9
    shuffle!(indices)
    for k in 1:10
        sInd = (k - 1) * batch + 1
        eInd = k * batch
        if k == 10
            eInd = n
        end
        validation = clean_autoData[indices[sInd:eInd], :]
        rest = collect(1:n)
        splice!(rest, collect(sInd:eInd))
        train = clean_autoData[indices[rest], :]
        mse_k[:, i] += getMSEOfValidation(train, validation)
    end
end
mse_k = mse_k ./ 10
p2 = plot(mse_k, xlabel="Degree of Polynomial", ylabel="Mean Squared Error", legend=false, title="10-fold CV")

plot(p1, p2)

# ╔═╡ 85096b5f-cd51-4740-8d2a-6002826d500a


# ╔═╡ Cell order:
# ╠═07adb61e-4066-4089-a237-5a2e7958cdb3
# ╠═33d00935-35ed-4abb-80d1-b0ffb2ba998d
# ╠═e1138abb-864c-40bd-a668-399ae0b95662
# ╠═2ef1ee68-2dc8-4dc8-8ca8-e367fe882c38
# ╠═7fcc3734-5007-4c82-99aa-e6f3e1911a5e
# ╠═85096b5f-cd51-4740-8d2a-6002826d500a
