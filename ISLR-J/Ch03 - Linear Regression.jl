### A Pluto.jl notebook ###
# v0.10.0

using Markdown

# ╔═╡ dc5b26d2-a780-432b-9f00-2f967fae8b3a
begin
    using AlgebraOfGraphics
    using DataFrames, CSV
end

# ╔═╡ 70363ac8-60dd-450a-9d36-75b7bcbdf0f8
md"""
## Load Advertising Data
"""

# ╔═╡ 0150ff57-ace8-490c-8394-3ac271942c44
adv_df = CSV.File("../data-islr/Advertising.csv") |> DataFrame;

# ╔═╡ edce8bc5-87b3-410d-add1-1acaba929769
first(adv_df, 5)

# ╔═╡ 80f4309c-bfe9-4d8c-8537-40f2c2dd2105


# ╔═╡ 6ea63bb7-8b90-41a6-9d37-0fa1d1f1defe
sales = adsData.sales;
tv = adsData.TV;

# ╔═╡ e97c3150-0c85-4c40-84ab-bbb36e3c3fa0
md"""
## Estimating β
"""

# ╔═╡ c2f2cd32-4cca-4ed2-85a2-c12cdd4b4339
function infer_params(x, y)
    x_bar = sum(x) / length(x)
    y_bar = sum(y) / length(y)
    
    xx = x .- x_bar
    yy = y .- y_bar
    
    β_1 = sum(xx .* yy) / sum(xx.^2)
    β_0 = y_bar - β_1 * x_bar
    
    return β_0, β_1
end

# ╔═╡ ad4f500f-56d5-4e19-a2ab-aa699cfc97c0
β_0, β_1 = infer_params(tv, sales)

# ╔═╡ ab0fd7f3-0d05-4855-8988-ff77bb22a4a2
predict(inp, b0, b1) = begin
    inp * b1 + b0
end

line_0 = [-1, 300]
line_1 = [predict(-1, β_0, β_1), predict(300, β_0, β_1)]

# ╔═╡ f15f594b-dbda-4d9f-8b43-54d592a9643d
scatter(tv, sales, xlabel="TV", ylabel="Sales", legend=false, markercolor="red")
plot!(line_0, line_1, lw = 3, lc="black")

# ╔═╡ f55ab628-1977-45e0-8a2b-11b8c170346c
RSS(a_0, a_1) = sum((sales .- (a_0 .+ a_1 .* tv)).^2) 

# ╔═╡ e1c2fa14-6196-44d6-b9a1-2720119afb30
a_0 = range(5, stop=9, length=1000)
a_1 = range(0, stop=0.1, length=1000)

p1 = contour(a_0, a_1, RSS)
p2 = plot(a_0, a_1, RSS, st=:surface)
plot(p1, p2)

# ╔═╡ 6457fd6e-dfcd-453c-8b4d-b0de75ab0411
Y(X) = 2.0 .+ 3.0 .* X

function create_sample(n)
    X = rand(Float64, n) .* 4.0 .- 2.0
    ϵ = randn(Float64, n)
    return Y(X) + ϵ, X
end

y, x = create_sample(100)

# ╔═╡ 3c3f2eb5-7051-44fe-84f2-fb4ed3aa5c9e
b0, b1 = infer_params(x, y)
line_0 = [-2, 2]
line_1 = [predict(-2, b0, b1), predict(2, b0, b1)]

# ╔═╡ 8a594893-bbf5-4268-bf33-c8f1a9ce14f4
p1 = scatter(x, y)
p1 = plot!(x, Y(x), lw=2, lc="red")
p1 = plot!(line_0, line_1, legend=false)

p2 = plot(x, Y(x), lw=2, lc="red")
for i in 1:10
    y, x = create_sample(100)
    b0, b1 = infer_params(x, y)
    line_0 = [-2, 2]
    line_1 = [predict(-2, b0, b1), predict(2, b0, b1)]
    
    p2 = plot!(line_0, line_1)
end

plot(p1, p2, legend=false)

# ╔═╡ ecff0357-603c-4671-a2c8-449b3882d501
ols = lm(@formula(sales ~ TV), adsData)

# ╔═╡ 86fc4ffa-dcb3-4c19-ba0e-383aebbaea8f
md"""
## 3.3 Multiple Linear Regression
"""

# ╔═╡ ef0c2de3-e667-497c-97a7-203c2b255bb6
ols = lm(@formula(sales ~ radio), adsData)

# ╔═╡ 8abef839-94e4-4f7c-9183-b80209b0324c
ols = lm(@formula(sales ~ newspaper), adsData)

# ╔═╡ cc9a5218-bfce-43de-8186-d7ae294a0b02
ols = lm(@formula(sales ~  TV + radio + newspaper), adsData)

# ╔═╡ c3500402-d069-4915-83b0-d0f95cb06113
# Table 3.5: correlation matrix
cor(Matrix(adsData[:, ["TV", "radio", "newspaper", "sales"]]))

# ╔═╡ 45685627-2757-4ef4-be5b-696ddc49300f
r2(ols)

# ╔═╡ 7b32ebf7-5ad1-47ca-b390-2f3c196ac4df
md"""
## Sec 3.3
"""

# ╔═╡ 7c9a7fbb-dad2-496a-9be7-6be4c2485128
creditData = CSV.File("dataset/Credit.csv") |> DataFrame;

# ╔═╡ 8862511c-e39e-49a3-a53e-2f30acaaf361
gr(size = (1300, 1100))

@df creditData corrplot([:Balance :Age :Cards :Education :Income :Limit :Rating], grid = false)

# ╔═╡ 397529df-a047-4ba6-9858-facd16027646
ols = lm(@formula(Balance ~ Gender), creditData)

# ╔═╡ cef52add-0b12-4ace-93c7-87f8fa2cdd4b
ols = lm(@formula(Balance ~ Ethnicity), creditData)

# ╔═╡ 670d2b8d-f084-4973-b897-4e40c949c3bf
# Remove the additive assumptions
ols = lm(@formula(sales ~  TV + radio + TV * radio), adsData)

# ╔═╡ 6a025114-e875-42b6-bfc6-bbc60db4e7dd
r2(ols)

# ╔═╡ f4865361-ebb6-403b-af6a-f1bfcb5c5559
md"""
## Section 3.3.2
"""

# ╔═╡ 7b0877ae-18bc-4455-8bb9-e881dd01a2aa
autoData = CSV.File("dataset/Auto.csv"; missingstring="?") |> DataFrame;
# ? in Auto.csv is treated as missing values

# ╔═╡ 9455a025-60b2-4bae-830e-1657b7e1715a
ols = lm(@formula(mpg ~  horsepower + horsepower^2), autoData)

# ╔═╡ f5e4fe74-b522-4915-95d8-ea68e2b8a594
ols5 = lm(@formula(mpg ~  horsepower + horsepower^2 + horsepower^3 + horsepower^4 + horsepower^5), autoData);
ols1 = lm(@formula(mpg ~ horsepower), autoData);

# ╔═╡ 085e2341-484d-4173-8244-32e9a35621c1
gr(size = (600, 500))

params1 = coef(ols1)
params2 = coef(ols)
params5 = coef(ols5)

inp = collect(45:0.1:250;) # `range` can be used. Note: `;` is very important https://stackoverflow.com/questions/55438134/creating-arrays-from-ranges-in-julia-without-using-collect

y1 = params1[1] .+ params1[2] .* inp
y2 = params2[1] .+ params2[2] .* inp + params2[3] .* (inp.^2)
y5 = params5[1] .+ params5[2] .* inp + params5[3] .* (inp.^2) + params5[4] .* (inp.^3) + params5[5] .* (inp.^4) + params5[6] .* (inp.^5)

plot(inp, hcat(y1, y2, y5), label = ["Linear" "Degree 2" "Degree 5"], lw = 3, legend=true)
scatter!(autoData.horsepower, autoData.mpg, xlabel="horsepower", ylabel="MPG")

# ╔═╡ 87598aaa-31e6-4061-8686-ba183fae5949
y1_hat = predict(ols1)
y2_hat = predict(ols)

clean_autoData = dropmissing(autoData, :horsepower)
hp = clean_autoData.horsepower
mpg = clean_autoData.mpg

e1_hat = mpg .- y1_hat
e2_hat = mpg .- y2_hat

gr(size = (1000, 500))

p1 = scatter(y1_hat, e1_hat, title="Residual Plot for Linear Fit", xlabel="Fitted values", ylabel="Residuals", legend=false)
p2 = scatter(y2_hat, e2_hat, title="Residual Plot for Quadratic Fit", xlabel="Fitted values", ylabel="Residuals", legend=false)
plot(p1, p2)

## TODO: add smooth fit. Maybe LOESS

# ╔═╡ e39f741e-d473-4634-880a-cd63cb7ecf64
# TODO: should we plot Fig 3.11 
# TODO: Fig 3.12 3.13 are quite "easy"

# ╔═╡ cee5d009-6839-46eb-a8ed-27ad0982c97b
md"""
## Section 3.3
"""

# ╔═╡ 9ba1dcee-0b97-46a6-8d80-b68b5a708331
# Figure 3.14
age = creditData.Age
limit = creditData.Limit
rating = creditData.Rating

p1 = scatter(limit, age, xlabel="Limit", ylabel="Age", legend=false)
p2 = scatter(limit, rating, xlabel="Limit", ylabel="Rating", legend=false)
plot(p1, p2)

# ╔═╡ 52ef484e-c6c0-4cbd-9a43-19b218e5a684
# Table 3.11
ols = lm(@formula(Balance ~ Age + Limit), creditData)
print(ols)
ols = lm(@formula(Balance ~ Rating + Limit), creditData)
print(ols)

# ╔═╡ 525c3971-fe71-46eb-8185-95b7906757e5
RSS_age_limit(β_1, β_2) = sum( (creditData.Balance .- β_1 .* creditData.Age .- β_2 .* creditData.Limit .+ 173.411).^2 )
RSS_rating_limit(β_1, β_2) = sum((creditData.Balance .- β_1 .* creditData.Rating .- β_2 .* creditData.Limit .+ 377.537).^2)

# ╔═╡ 4a16ef14-8481-462d-9a30-a4fd3868c0c5
gr(size = (600, 500))

b_0 = range(-5, stop=0, length=1000)
b_1 = range(0.15, stop=0.19, length=1000)

a_0 = -0.15:0.01:0.2
a_1 = -0.1:0.01:5
# p1 = contour(b_0, b_1, RSS_age_limit)
p1 = contour(b_0, b_1, RSS_age_limit)
p2 = contour(a_1, a_0, RSS_rating_limit)

plot(p1, p2)

# ╔═╡ 422c77a1-6539-4ee7-b8e4-0a7f41b3c584
## TODO: Fig 3.17 3.18 3.19 3.20 should be done

# ╔═╡ Cell order:
# ╠═dc5b26d2-a780-432b-9f00-2f967fae8b3a
# ╟─70363ac8-60dd-450a-9d36-75b7bcbdf0f8
# ╠═0150ff57-ace8-490c-8394-3ac271942c44
# ╠═edce8bc5-87b3-410d-add1-1acaba929769
# ╠═80f4309c-bfe9-4d8c-8537-40f2c2dd2105
# ╠═6ea63bb7-8b90-41a6-9d37-0fa1d1f1defe
# ╟─e97c3150-0c85-4c40-84ab-bbb36e3c3fa0
# ╠═c2f2cd32-4cca-4ed2-85a2-c12cdd4b4339
# ╠═ad4f500f-56d5-4e19-a2ab-aa699cfc97c0
# ╠═ab0fd7f3-0d05-4855-8988-ff77bb22a4a2
# ╠═f15f594b-dbda-4d9f-8b43-54d592a9643d
# ╠═f55ab628-1977-45e0-8a2b-11b8c170346c
# ╠═e1c2fa14-6196-44d6-b9a1-2720119afb30
# ╠═6457fd6e-dfcd-453c-8b4d-b0de75ab0411
# ╠═3c3f2eb5-7051-44fe-84f2-fb4ed3aa5c9e
# ╠═8a594893-bbf5-4268-bf33-c8f1a9ce14f4
# ╠═ecff0357-603c-4671-a2c8-449b3882d501
# ╟─86fc4ffa-dcb3-4c19-ba0e-383aebbaea8f
# ╠═ef0c2de3-e667-497c-97a7-203c2b255bb6
# ╠═8abef839-94e4-4f7c-9183-b80209b0324c
# ╠═cc9a5218-bfce-43de-8186-d7ae294a0b02
# ╠═c3500402-d069-4915-83b0-d0f95cb06113
# ╠═45685627-2757-4ef4-be5b-696ddc49300f
# ╟─7b32ebf7-5ad1-47ca-b390-2f3c196ac4df
# ╠═7c9a7fbb-dad2-496a-9be7-6be4c2485128
# ╠═8862511c-e39e-49a3-a53e-2f30acaaf361
# ╠═397529df-a047-4ba6-9858-facd16027646
# ╠═cef52add-0b12-4ace-93c7-87f8fa2cdd4b
# ╠═670d2b8d-f084-4973-b897-4e40c949c3bf
# ╠═6a025114-e875-42b6-bfc6-bbc60db4e7dd
# ╟─f4865361-ebb6-403b-af6a-f1bfcb5c5559
# ╠═7b0877ae-18bc-4455-8bb9-e881dd01a2aa
# ╠═9455a025-60b2-4bae-830e-1657b7e1715a
# ╠═f5e4fe74-b522-4915-95d8-ea68e2b8a594
# ╠═085e2341-484d-4173-8244-32e9a35621c1
# ╠═87598aaa-31e6-4061-8686-ba183fae5949
# ╠═e39f741e-d473-4634-880a-cd63cb7ecf64
# ╟─cee5d009-6839-46eb-a8ed-27ad0982c97b
# ╠═9ba1dcee-0b97-46a6-8d80-b68b5a708331
# ╠═52ef484e-c6c0-4cbd-9a43-19b218e5a684
# ╠═525c3971-fe71-46eb-8185-95b7906757e5
# ╠═4a16ef14-8481-462d-9a30-a4fd3868c0c5
# ╠═422c77a1-6539-4ee7-b8e4-0a7f41b3c584
