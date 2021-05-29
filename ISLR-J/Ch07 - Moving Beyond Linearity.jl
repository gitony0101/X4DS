### A Pluto.jl notebook ###
# v0.10.0

using Markdown

# ╔═╡ 2534899d-d74a-4b90-a725-e71576bbb768
begin
    using AlgebraOfGraphics
    using DataFrames, CSV
end

# ╔═╡ bc510c47-c290-415d-a224-7029b8174a92
wageData = CSV.File("dataset/Wage.csv") |> DataFrame;

# ╔═╡ 6db4f9f2-fafa-485e-919d-81e32a0da904
ols = lm(@formula(wage ~ age + age^2 + age^3 + age^4 ), wageData)

# ╔═╡ 1dc55143-565a-43c1-9edd-dccf2061b674
# Figure 7.1 (left)

x = collect(20:80)
y = predict(ols, DataFrame(age=x))
scatter(wageData.age, wageData.wage, label="data")
plot!(x, y, lw=3, xlabel="Age", ylabel="Wage", label="Degree 4")

# ╔═╡ f35e231a-8d66-4a30-b15f-6c20a2b209f5
wageData.is_250Wage = convert(Array{Int64, 1}, wageData.wage .> 250);

# ╔═╡ 8f1b4d50-bee0-4db6-b255-0aaeaa825759
logit = glm(@formula(is_250Wage ~ age + age^2 + age^3 + age^4), wageData, Binomial(), LogitLink())

# ╔═╡ 9c6fd23a-99f8-4c16-b922-e554c4eb0a98
# Figure 7.1 (right)
prob = predict(logit, DataFrame(age=x))

w_no = wageData[(wageData.wage .< 250), :]
low = w_no.age

w_yes = wageData[(wageData.wage .> 250), :]
high = w_yes.age

plot(x, prob, lw=3, xlabel="Age", ylabel="Wage > 250")
scatter!(low, zeros(length(low)), markercolor="yellow")
scatter!(high, 0.1 .* ones(length(high)), markercolor="yellow")
hline!([0, 0.1], line=:dash, legend=false)

# ╔═╡ 087a4935-8f81-4175-8d77-4d52e799a34d
wageData.is_firstGroup = convert(Array{Int64, 1}, wageData.age .< 33.5);
wageData.is_secondGroup = convert(Array{Int64, 1}, (wageData.age .> 33.5) .& (wageData.age .< 49.0));
wageData.is_thirdGroup = convert(Array{Int64, 1}, (wageData.age .> 49.0) .& (wageData.age .< 64.5));
wageData.is_fourthGroup = convert(Array{Int64, 1}, wageData.age .> 64.5);

# ╔═╡ 57f379b4-dec7-4588-a485-ea6e7560ccad
ols_step = lm(@formula(wage ~ is_firstGroup + is_secondGroup + is_thirdGroup + is_fourthGroup ), wageData)

# ╔═╡ 3c2c1461-9526-4d21-9330-3f4ea891ff13
# Figure 7.2 (left)
x = collect(20:80)
y = []
for i in x
    fg = convert(Int64, i < 33.5);
    sg = convert(Int64, (i > 33.5) & (i < 49.0))
    tg = convert(Int64, (i > 49.0) & (i < 64.5))
    ftg = convert(Int64, i > 64.5)
    pred = predict(ols_step, DataFrame(is_firstGroup=fg, is_secondGroup=sg, is_thirdGroup=tg, is_fourthGroup=ftg))
    push!(y, pred[1])
end

scatter(wageData.age, wageData.wage, label="data")
plot!(x, y, lw=3, xlabel="Age", ylabel="Wage", label="Step function")

# ╔═╡ 8504e2de-0847-4926-9098-ae7977fa116f
logit_step = glm(@formula(is_250Wage ~ is_firstGroup + is_secondGroup + is_thirdGroup + is_fourthGroup), wageData, Binomial(), LogitLink())

# ╔═╡ 0ee2629f-9293-4929-8f84-85299677e013
# Figure 7.2 (right)

x = collect(20:80)
y = []
for i in x
    fg = convert(Int64, i < 33.5);
    sg = convert(Int64, (i > 33.5) & (i < 49.0))
    tg = convert(Int64, (i > 49.0) & (i < 64.5))
    ftg = convert(Int64, i > 64.5)
    pred = predict(logit_step, DataFrame(is_firstGroup=fg, is_secondGroup=sg, is_thirdGroup=tg, is_fourthGroup=ftg))
    push!(y, pred[1])
end

w_no = wageData[(wageData.wage .< 250), :]
low = w_no.age

w_yes = wageData[(wageData.wage .> 250), :]
high = w_yes.age

plot(x, y, lw=3, xlabel="Age", ylabel="Wage > 250")
scatter!(low, zeros(length(low)), markercolor="yellow")
scatter!(high, 0.1 .* ones(length(high)), markercolor="yellow")
hline!([0, 0.1], line=:dash, legend=false)

# ╔═╡ 4105a806-2708-4fbc-a0c8-44f726c25d04


# ╔═╡ Cell order:
# ╠═2534899d-d74a-4b90-a725-e71576bbb768
# ╠═bc510c47-c290-415d-a224-7029b8174a92
# ╠═6db4f9f2-fafa-485e-919d-81e32a0da904
# ╠═1dc55143-565a-43c1-9edd-dccf2061b674
# ╠═f35e231a-8d66-4a30-b15f-6c20a2b209f5
# ╠═8f1b4d50-bee0-4db6-b255-0aaeaa825759
# ╠═9c6fd23a-99f8-4c16-b922-e554c4eb0a98
# ╠═087a4935-8f81-4175-8d77-4d52e799a34d
# ╠═57f379b4-dec7-4588-a485-ea6e7560ccad
# ╠═3c2c1461-9526-4d21-9330-3f4ea891ff13
# ╠═8504e2de-0847-4926-9098-ae7977fa116f
# ╠═0ee2629f-9293-4929-8f84-85299677e013
# ╠═4105a806-2708-4fbc-a0c8-44f726c25d04
